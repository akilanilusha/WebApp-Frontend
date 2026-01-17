import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Check from "@mui/icons-material/Check";
import Settings from "@mui/icons-material/Settings";
import GroupAdd from "@mui/icons-material/GroupAdd";
import VideoLabel from "@mui/icons-material/VideoLabel";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

/* -------------------- CUSTOM CONNECTOR -------------------- */
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, #2196f3 0%, #21cbf3 50%, #1de9b6 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, #2196f3 0%, #21cbf3 50%, #1de9b6 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
}));

/* -------------------- CUSTOM STEP ICON -------------------- */
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(136deg, #2196f3 0%, #21cbf3 50%, #1de9b6 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(136deg, #2196f3 0%, #21cbf3 50%, #1de9b6 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <Settings />,
    2: <GroupAdd />,
    3: <VideoLabel />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed ? <Check /> : icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

/* -------------------- MAIN COMPONENT -------------------- */
function Test() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%", p: 4 }}>
      {/* STEPPER */}
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* STEP CONTENT */}
      <Box sx={{ mt: 4, p: 3, border: "1px solid #ccc", borderRadius: 2 }}>
        {activeStep === 0 && <Typography>Step 1 Content</Typography>}
        {activeStep === 1 && <Typography>Step 2 Content</Typography>}
        {activeStep === 2 && <Typography>Step 3 Content</Typography>}
      </Box>

      {/* CONTROLS */}
      <Box sx={{ display: "flex", pt: 3 }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>

        <Box sx={{ flex: "1 1 auto" }} />

        <Button onClick={handleNext}>Next</Button>

        {!completed[activeStep] && (
          <Button onClick={handleComplete}>
            {completedSteps() === totalSteps() - 1
              ? "Finish"
              : "Complete Step"}
          </Button>
        )}
      </Box>

      {allStepsCompleted() && (
        <Box sx={{ mt: 3 }}>
          <Typography>All steps completed 🎉</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      )}
    </Box>
  );
}

export default Test;
