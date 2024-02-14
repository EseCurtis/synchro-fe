import { FaEye, FaFilePdf } from "react-icons/fa";

export const LegalDocItem = ({ doc }: { doc: string }) => {
  return (
    <>
      {!doc ? (
        <div>
          <div className="border-orange-400 border p-3 rounded-lg bg-orange-300/20 flex items-center justify-between">
            <div className="flex gap-2 items-center text-sm">
              <div className="border border-orange-400 rounded p-1 text-orange-400">
                <FaFilePdf />
              </div>
              <p>Legal_DOc_me.pdf</p>
            </div>
            <span
              onClick={() => {
                window.open(doc, "_blank");
              }}
              className="cursor-pointer text-orange-400 bg-black/5 p-1 rounded-full"
            >
              <FaEye />
            </span>
          </div>
        </div>
      ) : (
        <div>
          <span className="bg-yellow-400/20 whitespace-nowrap text-yellow-600 p-2 rounded-lg text-xs cursor-pointer">
            No Legal Document Submitted
          </span>
        </div>
      )}
    </>
  );
};

const LegalDoc = ({ business }: { business: any }) => {
  const doc = business?.kycDocument;

  return (
    <div className="flex flex-col ">
      <h3 className="flex gap-2 font-bold mb-4">KYC Document</h3>
      <div className="mb-3 text-sm">
        You are now viewing the Business legal document of {business?.user?.firstName}{" "}
        {business?.user?.lastName}
      </div>
      <LegalDocItem doc={doc} />
    </div>
  );
};

export default LegalDoc;
