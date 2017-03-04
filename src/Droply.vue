<template>
    <div>
        <form :action="url" class="dropzone" :id="id"> </form>
    </div>
</template>

<style lang="sass" rel="stylesheet/scss">
    @import url('../node_modules/dropzone/dist/dropzone.css');

    .dropzone {
        border: 2px dashed #42A5F5;
        color: #42A5F5;
        font-weight: 400;
        font-size: 16px;
        font-family: 'Arial', sans-serif;
        letter-spacing: 0.2px;
        transition: background-color .2s linear;

        &:hover{
            background-color: rgba(66,165,245,0.03);
        }

        .dz-preview {
            &:hover .dz-image img{
                transform: none;
                -webkit-filter: none;
            }

            .dz-image {
                border-radius: 0;
            }

            .dz-remove{
                position: absolute;
                z-index: 30;
                color: white;
                margin-left: 15px;
                padding: 10px;
                top: inherit;
                bottom: 15px;
                border: 2px white solid;
                text-decoration: none;
                text-transform: uppercase;
                font-size: 0.8rem;
                font-weight: 800;
                letter-spacing: 1.1px;
                opacity: 0;
            }

            .dz-details {
                bottom: 0;
                top: 0;
                color: white;
                background-color: rgba(33, 150, 243, 0.8);
                transition: opacity .2s linear;
                text-align: left;

                .dz-filename span, .dropzone .dz-preview .dz-details .dz-size span {
                    background-color: transparent;
                }

                .dz-filename:not(:hover) span{
                    border: none;
                }

                .dz-filename:hover span{
                    background-color: transparent;
                    border: none;
                }
            }

            &:hover .dz-remove {
                opacity: 1;
            }

            .dz-success-mark,
            .dz-error-mark {
                margin-left: -40px;
                margin-top: -50px;
            }

            .dz-success-mark i,
            .dz-error-mark i {
                color: white;
                font-size: 5rem;
            }
        }

        .dz-message {
            span {
                color: #42A5F5;
            }

            i {
                font-size: 86px;
                color: #42A5F5;
            }
        }
    }
</style>

<script>
  import Dropzone from 'dropzone'

  Dropzone.autoDiscover = false

  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      clickable: {
        type: Boolean,
        default: true
      },
      acceptedFileTypes: {
        type: String
      },
      thumbnailHeight: {
        type: Number,
        default: 200
      },
      thumbnailWidth: {
        type: Number,
        default: 200
      },
      showRemoveLink: {
        type: Boolean,
        default: true
      },
      maxFileSizeInMB: {
        type: Number,
        default: 2
      },
      maxNumberOfFiles: {
        type: Number,
        default: 5
      },
      autoProcessQueue: {
        type: Boolean,
        default: true
      },
      useFontAwesome: {
        type: Boolean,
        default: false
      },
      useCustomDropzoneOptions: {
        type: Boolean,
        default: false
      },
      dropzoneOptions: {
        type: Object
      },
      icons: {
        type: Object,
        default () {
          return {
            cloud: 'fa fa-cloud-upload',
            done: 'fa fa-check',
            error: 'fa fa-close'
          }
        }
      },
      uploadMessageText: {
        type: String,
        default: 'Drop files here to upload'
      },
      removeImageText: {
        type: String,
        default: 'Remove'
      },
      headers: {
        type: Object
      }
    },
    methods: {
      removeAllFiles: function () {
        this.dropzone.removeAllFiles(true)
      },
      processQueue: function () {
        this.dropzone.processQueue()
      }
    },
    mounted () {
      const element = document.getElementById(this.id)

      const defaultSettings = {
        clickable: this.clickable,
        thumbnailWidth: this.thumbnailWidth,
        thumbnailHeight: this.thumbnailHeight,
        maxFiles: this.maxNumberOfFiles,
        maxFilesize: this.maxFileSizeInMB,
        dictRemoveFile: this.removeImageText,
        addRemoveLinks: this.showRemoveLink,
        acceptedFiles: this.acceptedFileTypes,
        autoProcessQueue: this.autoProcessQueue,
        headers: this.headers,
        dictDefaultMessage: `<i class="${this.icons.cloud}" aria-hidden="true"></i>
                             <br>${this.uploadMessageText}`,
        previewTemplate: `
                        <div class="dz-preview dz-file-preview">
                            <div class="dz-image" style="width: ${this.thumbnailWidth}px; height: ${this.thumbnailHeight}px">
                                <img data-dz-thumbnail />
                            </div>
                            <div class="dz-details">
                                <div class="dz-size">
                                    <span data-dz-size></span>
                                </div>
                                <div class="dz-filename">
                                    <span data-dz-name></span>
                                </div>
                            </div>
                            <div class="dz-progress">
                                <span class="dz-upload" data-dz-uploadprogress></span>
                            </div>
                            <div class="dz-error-message">
                                <span data-dz-errormessage></span>
                            </div>
                            <div class="dz-success-mark">
                                <i class="${this.icons.done}" aria-hidden="true"></i>
                            </div>
                            <div class="dz-error-mark">
                                <i class="${this.icons.error}" aria-hidden="true"></i>
                            </div>
                        </div>`
      }

      const options = Object.assign({}, defaultSettings, this.dropzoneOptions)
      this.dropzone = new Dropzone(element, options)

      // Handle the dropzone events
      const vm = this
      this.dropzone.on('addedfile', function (file) {
        vm.$emit('droply-file-added', file)
      })

      this.dropzone.on('removedfile', function (file) {
        vm.$emit('droply-removed-file', file)
      })

      this.dropzone.on('success', function (file, response) {
        vm.$emit('droply-success', file, response)
      })

      this.dropzone.on('error', function (file, error, xhr) {
        vm.$emit('droply-error', file, error, xhr)
      })

      this.dropzone.on('sending', function (file, xhr, formData) {
        vm.$emit('droply-sending', file, xhr, formData)
      })

      this.dropzone.on('uploadprogress', function (file, progress, size) {
          vm.$emit('droply-uploadprogress', file, progress, size)
      })

    }
  }
</script>
