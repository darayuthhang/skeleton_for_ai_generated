"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FRONT_ENDPOINT } from "@/app/lib/front-end-point";

const DashboardTab = ({ promptLoading }) => {
  const pathname = usePathname();

  return (
    <div className=" flex flex-col gap-2 mt-1 ml-1 items-center md:flex-row ">
      {promptLoading ? (
        "Please wait our ai is working hard right now ... "
      ) : (
        <>
          <Link
            href={FRONT_ENDPOINT.DASHBOARD}
            className={`btn btn-sm   ${
              pathname === FRONT_ENDPOINT.DASHBOARD ? "btn-error" : ""
            }`}
          >
            New
          </Link>

          <Link
            href={`${FRONT_ENDPOINT.DASHBOARD}/previous`}
            className={`btn btn-sm  ${
              pathname === `${FRONT_ENDPOINT.DASHBOARD}/previous` ? "btn-error" : ""
            }`}
          >
            Previous
          </Link>
        </>
      )}
    </div>
  );
};
export default DashboardTab;
