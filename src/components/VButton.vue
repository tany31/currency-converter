<script setup lang="ts">
import { computed } from 'vue'

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined
  text?: boolean
  icon?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  text: false,
  icon: false
})

const classes = computed(() => {
  return {
    'v-button--text': props.text,
    'v-button--icon': props.icon
  }
})
</script>

<template>
  <button class="v-button" :class="classes" :type="type">
    <slot />
  </button>
</template>

<style lang="scss">
.v-button {
  border: none;
  background: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  flex-shrink: 0;

  background-color: #006fe8;
  border-color: #006fe8;
  border-radius: 4px;
  color: #fff;
  padding: 10px 20px;
  height: 48px;
  font-size: 18px;
  transition: 0.2s;

  &:hover {
    background-color: #2697ff;
    border-color: #2697ff;
  }

  &:disabled {
    background-color: #5f9bef;
    border-color: #5f9bef;
    cursor: not-allowed;
  }

  &--text {
    background-color: transparent;
    border-color: transparent;
    color: #006fe8;

    &:hover {
      background-color: #dee9fc;
      border-color: #dee9fc;
    }

    &:disabled {
      background-color: transparent;
      border-color: transparent;
      color: #5f9bef;
    }
  }

  &--icon {
    padding: 10px;
    width: 48px;
    height: 48px;
  }
}
</style>
