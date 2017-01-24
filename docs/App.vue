<template>
    <div class="container">
        <div class="row justify-content-md-center">
            <div class="col-6">
                <p class="text-center">
                    This is as simple Dropzone demo using Vue.js
                </p>
                <droply id="myDroply"
                        ref="droplyOne"
                        url="https://httpbin.org/post"
                        upload-message-text="Drop file(s) to upload <br><strong>or click</strong>"
                        @droply-file-added="onFileAdded"
                        @droply-removed-file="onFileRemoved"
                        @droply-success="onSuccess">
                </droply>
            </div>
        </div>
        <div class="row justify-content-md-center">
            <div class="col-2 text-center">
                <button v-if="showRemoveAllButton" class="btn btn-primary" @click="removeAll()">Remove all</button>
            </div>
        </div>
    </div>
</template>

<style>
    @import url('../node_modules/dropzone/dist/dropzone.css');
    @import 'https://fonts.googleapis.com/css?family=Roboto';
    html, body {
        height: 100vh;
        background-color: #F9F9F9;
    }
    .row {
        margin-top: 1rem;
    }
</style>

<script>
  import * as Droply from '../src/Droply.vue'

  export default {
    name: 'MainApp',
    components: {
      Droply
    },
    data () {
      return {
        processQueue: false,
        showRemoveAllButton: false
      }
    },
    methods: {
      onFileAdded() {
        this.showRemoveAllButton = true
      },
      onFileRemoved() {
        this.showRemoveAllButton = false
      },
      onSuccess(file) {
        console.log('A file was successfully uploaded')
      },
      removeAll() {
        this.$refs.droplyOne.removeAllFiles()
      }
    }
  }
</script>