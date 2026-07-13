import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="bg-[#DE6539] py-6 px-5 flex items-center justify-center">
      <div className="max-w-285 mx-auto">
        <Link href="/">
          <img
            src="/images/logo-white-horizontal.png"
            alt="Vend & Bien"
            className="max-w-55 md:max-w-70 h-auto"
          />
        </Link>
      </div>
    </header>
  );
}
