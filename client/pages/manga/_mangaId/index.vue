<template>
    <query-
        :query="getManga"
        :variables="{
            id: parseInt($route.params.mangaId),
        }"
    >
        <template slot-scope="{ data: { manga } }">
            <div class="book-page-header shadow-sm mb-5">
                <div class="container">
                    <div class="row">
                        <div class="col-4">
                            <ratio-box-
                                :dx="850"
                                :dy="1200"
                                class="bg-white shadow-sm rounded book-page-cover"
                            />
                        </div>
                        <div class="col-8">
                            <div class="book-page-title">{{ manga.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <!-- -->
                content
                <br />
                <br />
                <br />
                12312312
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </template>
    </query->
</template>
<script>
import { getManga } from '~/query/manga';

export default {
    head() {
        return {
            title: 'Manga Detail',
        };
    },
    data() {
        return {
            getManga,
        };
    },
};
</script>
<style lang="scss">
.book-page-header {
    background: #fafafa;
    .book-page-cover {
        transform: translateY(2rem);
    }

    .book-page-title {
        font-size: 1.5rem;
        font-weight: bold;
    }
}
</style>
