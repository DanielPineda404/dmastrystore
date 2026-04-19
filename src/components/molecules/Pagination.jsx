import { Button } from "../atoms/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <Button 
        variant="outline" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-30"
      >
        <ChevronLeft size={20} />
      </Button>
      
      <span className="text-sm font-medium text-zinc-600">
        Page <span className="text-black">{currentPage}</span> of {totalPages}
      </span>

      <Button 
        variant="outline" 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-30"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
};