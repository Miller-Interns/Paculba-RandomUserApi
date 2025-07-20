<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiArrowLeftThick } from '@mdi/js'

export default {
  name: 'my-component',
  components: {
    SvgIcon,
  },
  data() {
    return {
      path: mdiArrowLeftThick,
    }
  },
}
</script>
