<script setup lang="ts">
const router = useRouter();

const handleClickBackButton = () => {
  router.back();
};
</script>
<template>
  <h1>詳細ページ</h1>
  <div class="flex justify-center">
    <Button class="mt-4 bg-green-400 font-bold hover:bg-green-300" @click="handleClickBackButton">もどる</Button>
  </div>
</template>
