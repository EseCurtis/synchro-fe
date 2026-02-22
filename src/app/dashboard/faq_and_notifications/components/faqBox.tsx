"use client";

import Badge from "@/app/_components/forms/badge";
import Delete_Circle from "@/app/_components/icons/delete_circle";
import { pencil_edit } from "@/app/_components/icons/pencil_edit_icon";
import Modal from "@/app/_components/popups/modal";
import { Faq } from "@/v2/types/faq.types";
import { useMemo, useState } from "react";
import DeleteFaq from "./delete_faq";
import NewFaq from "./new_faq";

type Props = {
  faq: Faq;
};

const containerStyles = {
  border: "1.5px solid #EDEFF5",
};

export default function FaqBox({ faq }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModal, setDeleteModal] = useState(false);

  const answerPreview = useMemo(() => {
    if (!faq.answer) return "";
    if (faq.answer.length <= 240) return faq.answer;
    return `${faq.answer.slice(0, 240)}…`;
  }, [faq.answer]);

  return (
    <>
      <div className="py-5 px-4 rounded-md space-y-3" style={containerStyles}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase text-gray-400">
              {faq.category || "General"}
            </p>
            <h2 className="font-semibold text-lg leading-snug">
              {faq.question}
            </h2>
          </div>
          <div className="flex gap-3 items-center text-gray-500">
            <button onClick={() => setIsModalOpen(true)}>{pencil_edit}</button>
            <button
              onClick={() => setDeleteModal(true)}
              className="cursor-pointer"
            >
              <Delete_Circle />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-600 whitespace-pre-line">
          {answerPreview}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <Badge
            status={faq.isPublished ? "Active" : "Disabled"}
            label={faq.isPublished ? "Published" : "Draft"}
            size="small"
          />
          <span>
            Updated{" "}
            {new Date(faq.updatedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewFaq faq={faq} onClose={() => setIsModalOpen(false)} />
      </Modal>

      <Modal isOpen={isDeleteModal} onClose={() => setDeleteModal(false)}>
        <DeleteFaq faq={faq} onClose={() => setDeleteModal(false)} />
      </Modal>
    </>
  );
}
