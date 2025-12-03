import { AppToast } from "@/app/_components/AppToast";
import { Button } from "@/app/_components/button";
import { Spinner } from "@/app/_components/spinner/Spinner";
import {
  useCreateFaq,
  useUpdateFaq,
} from "@/hooks/api/faqs/use-admin-faqs";
import { Faq } from "@/v2/types/faq.types";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  faq?: Faq | null;
  onClose?: () => void;
};

export default function NewFaq({ faq, onClose }: Props) {
  const [question, setQuestion] = useState(faq?.question ?? "");
  const [answer, setAnswer] = useState(faq?.answer ?? "");
  const [category, setCategory] = useState(faq?.category ?? "");
  const [isPublished, setIsPublished] = useState(faq?.isPublished ?? true);
  const [displayOrder, setDisplayOrder] = useState<number>(
    faq?.displayOrder ?? 0
  );

  const { mutate: createFaq, isLoading: creating } = useCreateFaq();
  const { mutate: updateFaq, isLoading: updating } = useUpdateFaq();

  const isEditing = Boolean(faq);
  const isSubmitting = creating || updating;

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
      setCategory(faq.category ?? "");
      setIsPublished(faq.isPublished);
      setDisplayOrder(faq.displayOrder ?? 0);
    }
  }, [faq]);

  const canSubmit = useMemo(
    () => question.trim().length > 0 && answer.trim().length > 0,
    [question, answer]
  );

  const handleSubmit = () => {
    if (!canSubmit) {
      toast(<AppToast>Question and answer are required</AppToast>, {
        type: "error",
      });
      return;
    }

    const payload = {
      question: question.trim(),
      answer: answer.trim(),
      category: category.trim() || undefined,
      isPublished,
      displayOrder,
    };

    if (isEditing && faq) {
      updateFaq(
        { faqId: faq.id, payload },
        {
          onSuccess: () => {
            toast(<AppToast>FAQ updated</AppToast>, { type: "success" });
            onClose?.();
          },
          onError: (error: any) => {
            const message =
              error?.response?.data?.message ||
              "Unable to update FAQ. Please try again.";
            toast(<AppToast>{message}</AppToast>, { type: "error" });
          },
        }
      );
      return;
    }

    createFaq(payload, {
      onSuccess: () => {
        toast(<AppToast>FAQ added</AppToast>, { type: "success" });
        setQuestion("");
        setAnswer("");
        setCategory("");
        setIsPublished(true);
        setDisplayOrder(0);
        onClose?.();
      },
      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Unable to add FAQ. Please try again.";
        toast(<AppToast>{message}</AppToast>, { type: "error" });
      },
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold">
        {isEditing ? "Update FAQ" : "Add FAQ"}
      </h3>

      <div className="form items-left space-y-4">
        <div className="form-group flex flex-col items-start w-full">
          <label htmlFor="question" className="block text-gray-700">
            FAQ question
          </label>
          <input
            type="text"
            id="question"
            placeholder="Enter FAQ question"
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="form-group flex flex-col items-start w-full">
          <label htmlFor="category" className="block text-gray-700">
            Category (optional)
          </label>
          <input
            type="text"
            id="category"
            placeholder="e.g. Accounts, Events"
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="form-group flex flex-col items-start w-full">
          <label htmlFor="displayOrder" className="block text-gray-700">
            Display order
          </label>
          <input
            type="number"
            id="displayOrder"
            min={0}
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
            value={displayOrder}
            onChange={(e) => setDisplayOrder(Number(e.target.value) || 0)}
          />
        </div>

        <div className="form-group flex flex-col items-start w-full">
          <label htmlFor="answer" className="block text-gray-700">
            FAQ answer
          </label>
          <textarea
            id="answer"
            placeholder="Enter FAQ answer"
            rows={7}
            className="mt-1 p-2 border rounded-md w-full focus:ring-indigo-300 focus:border-indigo-300 resize-none"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          Visible to users
        </label>
      </div>

      <div className="mt-5 flex gap-4 items-center">
        <Button onClick={handleSubmit} disabled={!canSubmit || isSubmitting}>
          {isSubmitting ? <Spinner /> : isEditing ? "Update FAQ" : "Add FAQ"}
        </Button>
        <Button
          style={{ background: "white", color: "red" }}
          customClassName="text-red-500 border border-2 border-red-500"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
