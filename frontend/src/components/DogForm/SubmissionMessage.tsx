import { motion } from "motion/react";
import { ReactNode } from "react";

export function SuccessMessage({
  successReferenceId,
}: {
  successReferenceId: string | null;
}) {
  return (
    <GeneralMessage>
      <p className="text-green-600">
        Enquiry submitted successfully. Please note your acknowledgement number
        for future reference: <strong>{successReferenceId}</strong>
      </p>
    </GeneralMessage>
  );
}

export function ErrorMessage({
  processPetEnquiryRequest,
}: {
  processPetEnquiryRequest: () => void;
}) {
  return (
    <GeneralMessage>
      <p className="text-red-600">
        Something went wrong! Please{" "}
        <button className="underline" onClick={processPetEnquiryRequest}>
          try again
        </button>
        !
      </p>
    </GeneralMessage>
  );
}

function GeneralMessage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={"max-w-[500px] text-center"}
    >
      {children}
    </motion.div>
  );
}
