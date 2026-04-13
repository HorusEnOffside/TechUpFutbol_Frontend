import React from "react";

export interface RegisterStepProps {
  values: any;
  errors: any;
  onChange: (field: string, value: any) => void;
  onNext?: () => void;
  onBack?: () => void;
  isLast?: boolean;
  isFirst?: boolean;
}

interface RegisterStepsProps {
  step: number;
  children: React.ReactNode[];
}

export const RegisterSteps: React.FC<RegisterStepsProps> = ({ step, children }) => {
  return (
    <div>
      {React.Children.map(children, (child, idx) =>
        idx === step ? child : null
      )}
    </div>
  );
};
