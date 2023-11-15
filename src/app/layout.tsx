"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import "@/fonts/line-awesome-1.3.0/css/line-awesome.css";
import "@/styles/index.scss";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import DashboardWrapper from "@/components/DashboardWrapper/DashboardWrapper";
import store from "@/store/store";
import { Provider } from "react-redux";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" dir="" className={poppins.className}>
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className="text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <Provider store={store}>
          <SessionWrapper>
            <Toaster />
            <DashboardWrapper>{children}</DashboardWrapper> 
          </SessionWrapper>
        </Provider>
      </body>
    </html>
  );
}
