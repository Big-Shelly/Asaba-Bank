import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-12 h-12">
        <Image
          src="/logo.png"
          alt="Asaba National Bank Logo"
          fill
          className="object-contain"
        />
      </div>
      <div className="text-primary-600">
        <h1 className="text-2xl font-bold">Asaba National Bank</h1>
        <p className="text-sm font-medium">Since 2009</p>
      </div>
    </div>
  );
}
