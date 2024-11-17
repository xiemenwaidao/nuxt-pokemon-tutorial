<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination';

type PokedexPaginationProps = {
  totalCount: number;
  currentPage: number;
};

const props = defineProps<PokedexPaginationProps>();
const { totalCount, currentPage } = toRefs(props);

const ITEMS_PER_PAGE = 20;
const totalPages = computed(() => Math.ceil(totalCount.value / ITEMS_PER_PAGE));

const createPageUrl = (page: number) => `/pokedex?page=${page}`;

const getPagesToShow = (currentPage: number, totalPages: number) => {
  const pages: (number | string)[] = [];
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push('ellipsis-start');
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    pages.push(totalPages);
  }

  return pages;
};

const pagesToShow = computed(() => getPagesToShow(currentPage.value, totalPages.value));

const handlePageClick = (page: number) => {
  if (page !== currentPage.value) {
    navigateTo(createPageUrl(page));
  }
};
</script>

<template>
  <Pagination :total="totalPages" :sibling-count="1" show-edges :default-page="currentPage">
    <PaginationList class="flex items-center gap-1 pt-4">
      <PaginationFirst @click="handlePageClick(1)" />
      <PaginationPrev @click="handlePageClick(currentPage - 1)" />

      <template v-for="(pageItem, index) in pagesToShow" :key="index">
        <PaginationListItem v-if="typeof pageItem === 'number'" :value="pageItem" as-child>
          <Button
            class="h-10 w-10 p-0"
            :variant="pageItem === currentPage ? 'default' : 'outline'"
            @click="handlePageClick(pageItem)"
          >
            {{ pageItem }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else />
      </template>

      <PaginationNext @click="handlePageClick(currentPage + 1)" />
      <PaginationLast @click="handlePageClick(totalPages)" />
    </PaginationList>
  </Pagination>
</template>
