// Define the layout and order of trials in the experiment
// Configuration
import { Configuration } from "src/configuration";

// Import crossplatform API
import { Experiment } from "neurocog";

// Import jsPsych plugins
import "jspsych/plugins/jspsych-instructions";
import "jspsych/plugins/jspsych-html-keyboard-response";

// Import custom styling
import "./css/styles.css";

// Create a new Experiment instance
export const experiment = new Experiment(Configuration);

// Timeline setup
const timeline = [];

const generateTrial = (): any[] => {
  const stimuli = [];

  // Generate random duration for fixation cross
  const duration = Math.round(1500 + experiment.random() * 1000);

  // Fixation cross
  stimuli.push({
    type: "html-keyboard-response",
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: "NO_KEYS",
    trial_duration: duration,
  });

  // Centrally presented stimulus

  // LVF or RVF stimulus

  return stimuli;
};

timeline.push(...generateTrial());

// Configure and start the experiment
experiment.start({
  timeline: timeline,
  show_progress_bar: true,
  show_preload_progress_bar: true,
});
