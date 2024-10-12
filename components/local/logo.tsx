import Image from "next/image";
import Link from "next/link";

export default function Logo({ white = false }: { white?: boolean }) {
  return (
    <>
    <Link href="/">
      {white ? (
        <Image src={"/images/logo-white.png"} alt="logo" width={71} height={40} />
      ) : (
        <Image src={"/images/logo.png"} alt="logo" width={71} height={40} />
      )}
      </Link>
    </>
  );
}
