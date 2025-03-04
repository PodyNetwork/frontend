import Image from "next/image";
import partner from "../../../data/partner.json";
import Link from "next/link";

const Partner = () => {
  return (
    <div
      className="max-w-5xl 2xl:max-w-7xl mx-auto py-16 px-5 md:px-6"
      aria-label="Partner"
    >
      <div className="text-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row flex-wrap gap-x-10 gap-y-8 items-center justify-center">
            {partner.map((partnerdata, index) => (
              <Link
                href={partnerdata.url}
                className="cursor-pointer"
                target="_blank"
                key={index}
              >
                <Image
                  src={partnerdata.src}
                  alt={partnerdata.name}
                  width={300}
                  height={300}
                  className="object-contain w-28 md:w-32 _partner_img"
                  
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner;
