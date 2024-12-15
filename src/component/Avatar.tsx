
interface AvatarProps {
  width: string;
  height: string;
  alignSelf?: 'flex-start' | 'center' | 'flex-end';
  margin?: string;
  image: string;
}

const Avatar: React.FC<AvatarProps> = ({ width, height, alignSelf, margin, image }) => {
  return (
    <div className="avatar" style={{ width, height, alignSelf, margin }}>
      <img className="avatar-image" src={image} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
    </div>
  );
};

export default Avatar;