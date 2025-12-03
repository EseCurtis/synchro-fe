import { FC } from "react";
import { Spinner } from "../spinner/Spinner";

interface IProps {
  offset?: any;
  pages?: any;
  onFetchMore?: () => void;
  loading?: boolean;
}

const TablePagination: FC<IProps> = ({
  offset = 3,
  pages = 320,
  loading,
  onFetchMore,
}: IProps) => {
  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <button
          onClick={onFetchMore}
          className="text-sm px-4 py-2 bg-slate-100 rounded-full flex items-center gap-2"
        >
          {loading && <Spinner />} Load More
        </button>
      </div>
    </>
  );
};

export default TablePagination;
