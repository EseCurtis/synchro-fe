
interface INoData {
  title?: string;
  description?: string;
}

const NoData: React.FC<INoData> = ({ title = "No data to display", description = "There is no information available at the moment." }) => {
  return (
    <div className="flex flex-col text-center items-center py-5 gap-3">
      <img src="/images/noData.svg" width={119} height={105} alt="No Data Image" className="pb-5"/>
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default NoData;
