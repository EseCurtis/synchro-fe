import { FC } from 'react';
import { MdMoreHoriz } from 'react-icons/md';
interface IPropsRoles {
  role: string;
  content: string;
}

const styles = {
  border: '1.5px solid #EDEFF5 ',
  height: '155px',
  padding: '10px 15px',
};

const RolesComponent: FC<IPropsRoles> = ({ role, content }) => {
  return (
    <div className='w-[260px] ' style={styles}>
      <div className='flex justify-between items-center'>
        <h3 className='font-md  text-[18px] '>Admin</h3>
        <MdMoreHoriz />
      </div>

      <p className='text my-4'>
        Lorem ipsum dolor sit amet consectetur. Eu vestibulum tempor.
      </p>
    </div>
  );
};
export default RolesComponent;
