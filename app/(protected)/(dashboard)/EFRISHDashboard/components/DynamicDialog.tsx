"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommonDataTables } from "@/components/table-data/common-tables";

type ModalType =
  | "pending_invoice"
  | "stock_adjustment"
  | "stock_sync_adjustment"
  | "sync_route_invoice"
  | null;

export function DynamicDialog({
  activeModal,
  setActiveModal,
  modalConfig,
}: {
  activeModal: ModalType;
  setActiveModal: (val: ModalType) => void;
  modalConfig: any;
}) {
  return (
    <Dialog open={!!activeModal} onOpenChange={() => setActiveModal(null)}>
      <DialogContent className="w-[100vw] max-w-none h-[90vh] p-2 flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {/* {activeModal ? modalConfig[activeModal].title : ""} */}
          </DialogTitle>
        </DialogHeader>

        {activeModal && (
          <div className="flex-1 overflow-auto">
            <CommonDataTables
              columns={modalConfig[activeModal].columns}
              data={modalConfig[activeModal].data}
              isFetching={modalConfig[activeModal].isFetching}
              pagination={{ current_page: 1, total_pages: 1 }}
              tableHeight="calc(67vh - 120px)"
              headerTitle={activeModal ? modalConfig[activeModal].title : ""}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
