<template>
    <query-
        :query="getManga"
        :variables="{
            id: parseInt($route.params.mangaId),
        }"
        :poll-interval="0"
        class="container"
    >
        <template slot-scope="{ data: { manga } }">
            <div class="row">
                <div class="col-4 col-md-3 col-lg-3 px-0">
                    <ratio-box- :dx="850" :dy="1200" class="mt-4">
                        <image-
                            :source="manga.image.url"
                            class="w-100 h-100 object-fit-cover shadow rounded overflow-hidden"
                        />
                    </ratio-box->
                    <div class="d-flex mb-3">
                        <b-button variant="main" class="mt-3 flex-fill">
                            Add to list
                        </b-button>
                        <b-button variant="red" class="mt-3 ml-2">
                            <span class="icon"></span>
                        </b-button>
                    </div>
                    <div class="p-3 shadow bg-white rounded">
                        <div class="text-bold">Associated Names</div>
                        <div class="mb-3">
                            {{ manga.associatedNames.join(', ') }}
                        </div>

                        <div class="text-bold">Format</div>
                        <div class="mb-3 text-capitalize">
                            {{ manga.type.toLowerCase() }}
                        </div>

                        <div class="text-bold">Status</div>
                        <div class="mb-3 text-capitalize">
                            {{ manga.status.toLowerCase() }}
                        </div>

                        <div class="text-bold">Author</div>
                        <div class="mb-3">{{ manga.authors }}</div>

                        <div class="text-bold">Published From</div>
                        <div class="mb-3">{{ manga.publishedFrom }}</div>

                        <div class="text-bold">Published To</div>
                        <div>{{ manga.publishedTo }}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="book-page-top py-4 px-3 position-relative mb-5">
                        <h3 class="text-bold">{{ manga.name }}</h3>
                        <div class="book-page-tags nmx-2 mb-2">
                            <nuxt-link
                                v-for="(genre, index) in manga.genres"
                                :key="index * 2"
                                to="/"
                            >
                                {{ genre.name }}
                            </nuxt-link>
                        </div>
                        <div>{{ manga.description }}</div>
                    </div>
                    <div class="d-flex mx-3 mb-3">
                        <b-form-radio-group
                            id="btnradios3"
                            v-model="contentTab"
                            buttons
                            button-variant="main"
                            :options="['Chapters', 'Reviews', 'Comments']"
                            name="radioBtnStacked"
                        />
                    </div>
                    <div class="mx-3 shadow bg-white rounded">
                        <template
                            v-for="(chapter, index) in sortChapters(
                                manga.chapters,
                            )"
                        >
                            <b-hr- v-if="index !== 0" :key="index * 2 + 1" />
                            <nuxt-link
                                :key="index * 2"
                                to="/"
                                class="d-block p-3 chapter-item"
                            >
                                {{ chapter.name }}
                            </nuxt-link>
                        </template>
                    </div>
                </div>
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
            contentTab: 'Chapters',
        };
    },
    methods: {
        sortChapters: chapters =>
            chapters
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .reverse(),
    },
};
</script>
<style lang="scss">
.book-page-cover-background {
    background: red;
    height: 300px;
}

.book-page-tags {
    > a {
        background-color: $main;
        color: white;
        padding: 0.25rem 1rem;
        border-radius: 2.5rem;
        margin: 0.25rem;
        display: inline-block;
        font-size: 0.9em;
        transition: 0.2s all;
        &:hover {
            text-decoration: none;
            background-color: darken($main, 10%);
        }
    }
}

.book-page-header {
    background: #fafafa;
    .book-page-header-cover {
        // transform: translateY(2rem);
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    .book-item-tags {
        > * {
            display: inline-block;
        }
    }
}

.book-page-top::after {
    content: '';
    z-index: -1;
    background: #fafafa;
    position: absolute;
    left: -100%;
    right: -100%;
    bottom: 0;
    top: 0;
    box-shadow: $box-shadow-sm;
}

.chapter-item {
    &:first-child {
        border-radius: $border-radius $border-radius 0 0;
    }
    &:last-child {
        border-radius: 0 0 $border-radius $border-radius;
    }
    &:hover {
        text-decoration: none;
        background: rgba($black, 0.075);
    }
}
</style>
