import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import NcModal from "@/shared/NcModal/NcModal";

export interface ModalDeleteProps {
  show: boolean;
  onCloseModalDelete: () => void;
  title?: string;
  description?: string;
  textOk?: string;
  textCancel?: string;
  onConfirm?: any;
  content?: any;
}

const ModalDelete: FC<ModalDeleteProps> = ({
  show,
  onCloseModalDelete,
  title,
  description,
  textCancel,
  textOk,
  content,
  onConfirm,
}) => {
  const handleClickSubmitForm = () => {
    console.log({ 1: "1" });
  };

  const renderContent = () => {
    return (
      <form >
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          {title}
        </h3>
        <span className="text-sm">{description}</span>
        {content}
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={() => onConfirm && onConfirm()} type="submit">
            {textOk}
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDelete}>
            {textCancel}
          </ButtonSecondary>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalDelete}
      contentExtraClass="max-w-screen-sm overflow-visible"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalDelete;
