// Define the layout and order of trials in the experiment
// Configuration
import { Configuration } from "src/configuration";

// Import Experiment class
import { Experiment } from "neurocog";

// Utility libraries
import _ from "lodash";

// Import jsPsych plugins
import "jspsych/plugins/jspsych-instructions";
import "jspsych/plugins/jspsych-html-keyboard-response";

// Import custom styling
import "./css/styles.css";

// Create a new Experiment instance
export const experiment = new Experiment(Configuration);

// Timeline setup
const timeline = [];

const generateTrial = (type: "faces" | "words" | "cars"): any => {
  // Generate random duration for fixation cross
  const duration = Math.round(1500 + experiment.random() * 1000);

  // Trial variables
  const isLeft = experiment.random() < 0.5; // If the second stimulus will be presented on the left
  const isSame = experiment.random() < 0.5; // If the second stimulus is the same as the first

  // Construct stimuli representations
  const centralPresentation = {
    stimulus: ``,
  };

  const visualFieldPresentation = {
    leftStimulus: ``,
    rightStimulus: ``,
  };

  if (_.isEqual(type, "faces")) {
    // Generate a random array
    const faceIndex = [];
    for (let i = 1; i <= 30; i++) {
      faceIndex.push(i);
    }

    // Select the first stimulus
    const firstFace = Math.round(experiment.random() * faceIndex.length);
    faceIndex.splice(firstFace - 1, 1);

    // Setup the first stimulus presentation
    centralPresentation.stimulus = `<img class="profile" src="img/m/m${firstFace}.jpg" />`;

    // Setup the second stimulus presentation
    if (isSame) {
      // If the same stimulus is being presented, set the side of presentation
      if (isLeft) {
        visualFieldPresentation.leftStimulus = `<img class="profile" src="img/m/m${firstFace}.jpg" />`;
      } else {
        visualFieldPresentation.rightStimulus = `<img class="profile" src="img/m/m${firstFace}.jpg" />`;
      }
    } else {
      // If a different stimulus is being presented, select a second stimulus and the side of presentation
      const secondFace = Math.round(experiment.random() * faceIndex.length);
      if (isLeft) {
        visualFieldPresentation.leftStimulus = `<img class="profile" src="img/m/m${secondFace}.jpg" />`;
      } else {
        visualFieldPresentation.rightStimulus = `<img class="profile" src="img/m/m${secondFace}.jpg" />`;
      }
    }
  }

  return {
    type: "html-keyboard-response",
    timeline: [
      // Fixation cross
      {
        stimulus: '<div style="font-size:60px;">+</div>',
        choices: "NO_KEYS",
        trial_duration: duration,
      },
      // Centrally-presented stimulus
      {
        stimulus: `
          <div class="profile-single">
            <div class="profile-container">
              ${centralPresentation.stimulus}
            </div>
          </div>
        `,
        choices: "NO_KEYS",
        trial_duration: 750,
      },
      // LVF or RVF stimulus
      {
        stimulus: `
          <div class="profile-double">
            <div class="profile-container">
              ${visualFieldPresentation.leftStimulus}
            </div>
            <div class="profile-container">
              ${visualFieldPresentation.rightStimulus}
            </div>
          </div>
        `,
        choices: "NO_KEYS",
        trial_duration: 150,
      },
      // Response
      {
        stimulus: `
          <div>
            <p style="font-size:60px;">
              Was the second image the same as the first image?
            </p>
            <p style="font-size:60px;">
              Press "F" if yes, press "J" if no.
            </p>
          </div>
        `,
        choices: ["F", "J"],
      },
    ],
  };
};

// Add fixed number of trials to the experiment timeline
for (let i = 0; i < 96; i++) {
  timeline.push(generateTrial("faces"))
}

// Configure and start the experiment
experiment.start({
  timeline: timeline,
  show_progress_bar: true,
  show_preload_progress_bar: true,
});
