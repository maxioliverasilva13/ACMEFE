"use client";

import useGlobal from "@/hooks/useGlobal";
import { useLoginWithExternalServiceMutation } from "@/store/service/UserService";
import { signInWithFacebook, signInWithGoogle } from "../../../firebase";
import { User } from "firebase/auth";
import toast from "react-hot-toast";import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";

const SocialMediasLogin = () => {
  const { handleSetToken, handleSetLoading } = useGlobal();
  const [handleCreateUserWithExternalService] =
    useLoginWithExternalServiceMutation();

  const handleLoginWithFacebook = async () => {
    try {
      const resp = (await signInWithFacebook()) as User;
      await handleCreateUser(resp);
    } catch (error) {
      console.log("error", error);
      toast.error("Error al loguearse con Facebook");
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const resp = (await signInWithGoogle()) as User;
      await handleCreateUser(resp);
    } catch (error) {
      toast.error("Error al loguearse con Facebook");
    }
  };

  const handleCreateUser = async (user: User) => {
    handleSetLoading(true);
    const dataToSend = {
      Imagen: user.photoURL,
      Name: user.displayName,
      Email: user.email,
      Uid: user.uid,
      SecretWord: "Secret_Work_Create_EXTERNAL",
    };

    const resp = (await handleCreateUserWithExternalService(dataToSend)) as any;
    if (resp?.data?.token) {
      const token = resp?.data?.token;
      handleSetToken(token);
    } else {
      console.log("resp", resp);
      toast.error(
        "Error al crear usuario con servicio externo " + resp?.error?.data ??
          "Error"
      );
    }
    handleSetLoading(false);
  };

  const loginSocials = [
    {
      name: "Continuar con Facebook",
      href: "#",
      icon: facebookSvg,
      action: () => handleLoginWithFacebook(),
    },
    {
      name: "Continuar con Twitter",
      href: "#",
      icon: twitterSvg,
    },
    {
      name: "Continuar con Google",
      action: () => handleLoginWithGoogle(),
      icon: googleSvg,
    },
  ];

  return (
    <div className="grid gap-3">
      {loginSocials.map((item, index) => (
        <button
          key={index}
          onClick={() => item?.action && item?.action()}
          className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
        >
          <Image
            className="flex-shrink-0"
            src={item.icon}
            alt={item.name}
            sizes="40px"
          />
          <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
            {item.name}
          </h3>
        </button>
      ))}
    </div>
  );
};

export default SocialMediasLogin;
