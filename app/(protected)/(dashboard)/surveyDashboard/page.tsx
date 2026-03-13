"use client";

import { useState } from "react";
import { SectionCards } from "./components/section-cards";
import { Card } from "@/components/ui/card";
import { CommonDataTable } from "@/components/table-data/common-table";
import { sectionColumns } from "./components/columns";
import data from "./components/data.json";

export default function Salesdashboa() {
  const [activeTable, setActiveTable] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="lg:px-6 px-1 pb-6">
          <SectionCards onCardClick={(id: any) => setActiveTable(id)} />
        </div>

        {/* TABLE SECTION */}

        {activeTable === "customers" && (
          <div className="lg:px-6 px-1">
            <Card className="shadow-sm py-2">
              <CommonDataTable
                columns={sectionColumns}
                data={data}
                pageSize={5}
                headerTitle="Top Customers By"
              />
            </Card>
          </div>
        )}

        {activeTable === "users" && (
          <div className="lg:px-6 px-1">
            <Card className="shadow-sm py-2">
              <CommonDataTable
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
            <Card className="shadow-sm py-2">
              <CommonDataTable
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
            <Card className="shadow-sm py-2">
              <CommonDataTable
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
