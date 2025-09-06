import React from "react";

interface SubHeaderProps {
  topic: string;
  subline?: string;
}

const SubHeader: React.FC<SubHeaderProps> = ({ topic, subline }) => {
  return (
    <div className="pb-8">
      <p className="text-2xl font-bold">{topic}</p>
      <p className="text-sm font-medium">{subline}</p>
    </div>
  );
};

export default SubHeader;
