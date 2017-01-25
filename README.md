<p align="center">
<img src="https://raw.githubusercontent.com/codeunitedio/droply/master/docs/img/logo.png">
</p>

<p align="center">
<a href="https://www.npmjs.com/package/droply"><img src="https://badge.fury.io/js/droply.svg" alt="npm version" height="18"></a>

<a href="https://www.npmjs.com/package/droply"><img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg" alt="vue version" height="18"></a>

</p>

## Introduction

Droply is a tiny Dropzone wrapper for the VueJS 2.

## Usage

### Installation

You can install Droply with npm or yarn package manager:

```
yarn add droply --dev
```

You'll also need to load the [FontAwesome](http://fontawesome.io/) icon kit:

````
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
````

Next step is to import the module:

```
import Droply from 'droply'
```

Then you can register it globaly using Vue.use() or inside a components object.

### Example

```
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
    @import url('https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css');
    
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
```

## License

Droply is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

