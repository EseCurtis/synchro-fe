import { FC } from 'react';
<<<<<<< HEAD

=======
import { MdMoreHoriz } from 'react-icons/md';
>>>>>>> 58b1b459c710fafb8826a909a8fd90b861c3c70a
interface IPropsRoles {
  role: string;
  content: string;
}

<<<<<<< HEAD
const RolesComponent: FC<IPropsRoles> = ({ role, content }) => {
  return <div>lorel</div>;
=======
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
>>>>>>> 58b1b459c710fafb8826a909a8fd90b861c3c70a
};
export default RolesComponent;
