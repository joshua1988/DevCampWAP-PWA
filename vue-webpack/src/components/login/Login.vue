<template lang="html">
  <form>
    <div>
      <label for="id">ID : </label>
      <input type="email" name="id">
    </div>
    <div>
      <label for="pw">PW : </label>
      <input type="password" name="pw">
    </div>
    <div>
      <button type="button" name="button">Login</button>
      <button type="button" name="button">Google</button>
      <button type="button" name="button">Facebook</button>
    </div>
  </form>
</template>

<script>
export default {
}
</script>

<style lang="css">
  input {
    border-style: groove;
  }
  button {
    border-radius: 1em;
  }
</style>
