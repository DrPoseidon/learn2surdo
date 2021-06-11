<template>
  <div :class="$style.root">
    <L2SHeader :class="$style.header" />
    <div :class="$style.main">
      <L2SAddForm />
      <L2SShowAllData />
    </div>
  </div>
</template>
<script>
import L2SAddForm from "Blocks/L2SAddForm";
import L2SShowAllData from "Blocks/L2SShowAllData";
import L2SHeader from "Components/L2SHeader";
export default {
  name: "admin",
  components: {
    L2SAddForm,
    L2SShowAllData,
    L2SHeader,
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
