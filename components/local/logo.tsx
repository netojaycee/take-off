import Image from "next/image";

export default function Logo({ white = false }: { white?: boolean }) {
  return (
    <>
      {white ? (
        <Image src={"/logo-white.png"} alt="logo" width={71} height={40} />
      ) : (
        <Image src={"/logo.png"} alt="logo" width={71} height={40} />
      )}
    </>
  );
}
