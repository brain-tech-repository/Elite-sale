"use client";

import { useState } from "react";
import { SectionCards } from "./components/section-cards";
import { Card } from "@/components/ui/card";
import { CommonDataTables } from "@/components/table-data/common-tables";
import { sectionColumns } from "./components/columns";
import data from "./components/data.json";
import DataTableHeader from "@/components/table-data/data-table-header";

export default function Salesdashboa() {
  const [activeTable, setActiveTable] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-1 flex-col mt-6">
        <div className=" py-6 px-6">
          <DataTableHeader title=" IB Survey Dashboard" />
        </div>
        <div className="lg:px-6 px-1 pb-6">
          <SectionCards onCardClick={(id: any) => setActiveTable(id)} />
        </div>

        {/* TABLE SECTION */}

        {activeTable === "customers" && (
          <div className="lg:px-6 px-1">
            <CommonDataTables
              columns={sectionColumns}
              data={data}
              pageSize={5}
              headerTitle="Top Customers By"
            />
          </div>
        )}

        {activeTable === "users" && (
          <div className="lg:px-6 px-1">
            <Card className="shadow-xm py-2">
              <CommonDataTables
                columns={sectionColumns}
                data={data}
                pageSize={5}
                headerTitle="Top Users"
              />
            </Card>
          </div>
        )}
        {activeTable === "country" && (
          <div className="lg:px-6 px-1">
            <Card className="shadow-xm py-2">
              <CommonDataTables
                columns={sectionColumns}
                data={data}
                pageSize={5}
                headerTitle="Top Country"
              />
            </Card>
          </div>
        )}
        {activeTable === "surveys" && (
          <div className="lg:px-6 px-1">
            <Card className="shadow-xm py-2">
              <CommonDataTables
                columns={sectionColumns}
                data={data}
                pageSize={5}
                headerTitle="Top Surveys"
              />
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
