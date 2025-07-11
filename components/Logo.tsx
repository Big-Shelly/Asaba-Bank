import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Asaba Bank Logo"
        width={40}
        height={40}
        className="object-contain"
      />
      <span className="text-2xl font-bold">Asaba Bank</span>
    </div>
  );
};

export default Logo;
