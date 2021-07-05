<template>
  <div :class="$style.root">
    <L2SAddForm />
    <L2SShowAllData />
  </div>
</template>
<script>
import L2SAddForm from "Blocks/L2SAddForm";
import L2SShowAllData from "Blocks/L2SShowAllData";
export default {
  name: "admin",
  components: {
    L2SAddForm,
    L2SShowAllData,
  },
  created() {
    if (!localStorage.getItem("userID")) {
      this.$router.push("/login");
    } else if (JSON.parse(localStorage.getItem("role")) !== true) {
      this.$router.push("/");
    }
  },
};
</script>
<style lang="scss" module>
@import "./styles.scss";
</style>
