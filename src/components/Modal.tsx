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
  primaryType?: any;
  contentTop?: boolean;
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
  primaryType = "button",
  contentTop = false,
}) => {
  const renderContent = () => {
    return (
      <div className="appears">
        {contentTop && content}
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          {title}
        </h3>
        <span className="text-sm">{description}</span>
        {!contentTop && content}
        <div className="mt-4 space-x-3">
          <ButtonPrimary onClick={() => onConfirm && onConfirm()} type={primaryType}>
            {textOk}
          </ButtonPrimary>
          <ButtonSecondary type="button" onClick={onCloseModalDelete}>
            {textCancel}
          </ButtonSecondary>
        </div>
      </div>
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
