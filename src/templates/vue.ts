import type { Answers } from "../types";

export const componentTemplate = (answers: Answers) => `<script setup>
</script>

<template>
  <h1>${answers.componentName}</h1>
</template>
`;
