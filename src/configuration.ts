/**
 * @file Configuration file used by the task for general configuration.
 * Contains standard information about experiment parameters and
 * error handling. Can be extended as required.
 * @author Henry Burgess <henry.burgess@wustl.edu>
 */

// Logging level
import { LogLevel } from "consola";

// Configuration and other required data
export const Configuration = {
  // General information
  name: "Words and Faces Task",
  studyName: "task_words_faces",
  target: __TARGET__,

  // Error screen configuration
  allowParticipantContact: false,
  contact: "henry.burgess@wustl.edu",

  // Input configuration
  inputs: {
    desktop: {
      left: "f",
      right: "j",
      submit: " ",
    },
    spectrometer: {
      left: "1",
      right: "2",
      submit: "3",
      trigger: "5",
    },
  },

  // Manipulations that are configured in Gorilla
  manipulations: {},

  // Collection of any stimuli used in the trials
  stimuli: {},

  // Collection of any resources used in the trials
  resources: {},

  // Seed for RNG
  seed: 0.0836,

  // Initial experiment state
  state: {},

  // Force fullscreen when deployed
  fullscreen: process.env.NODE_ENV !== "development",

  // Set the logging level
  logging:
    process.env.NODE_ENV === "development" ? LogLevel.Verbose : LogLevel.Error,
};
