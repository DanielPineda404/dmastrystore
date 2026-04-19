import { Button } from "../atoms/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <Button 
        variant="outline" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2"
      >
        <ChevronLeft size={20} />
      </Button>
      <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
      <Button 
        variant="outline" 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
};