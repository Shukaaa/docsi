const grunt = require('grunt');
const config = grunt.file.readJSON('docsi.config.json');
const pageOrder = config['pageOrder'];
const minifyJs = config['build']['minifyJs'];
const minifyCss = config['build']['minifyCss'];
const buildDir = config['build']['buildDir'];

grunt.loadNpmTasks('grunt-markdown');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-prettify');

grunt.initConfig({
    concat: {
        options: {
            separator: '\n\n'
        },
        md: {
            src: pageOrder.map(page => `src/content/${page}.md`),
            dest: 'temp/index.md'
        },
        css: {
            src: ['src/css/*.css', 'src/css/**/*.css', 'src/css/**/**/*.css'],
            dest: 'temp/style.css'
        },
        js: {
            src: ['src/js/*.js', 'src/js/**/*.js', 'src/js/**/**/*.js'],
            dest: 'temp/script.js'
        }
    },
    clean: {
        dist: {
            src: [buildDir]
        },
        md: {
            src: [buildDir + '/index.md']
        },
        temp: {
            src: ['temp']
        }
    },
    copy: {
        assets: {
            files: [
                {
                    expand: true,
                    cwd: 'src/assets/',
                    src: ['**'],
                    dest: 'temp/assets/'
                }
            ]
        },
        build: {
            files: [
                {
                    expand: true,
                    cwd: 'temp/',
                    src: ['**'],
                    dest: buildDir + '/'
                }
            ]
        }
    },
    markdown: {
        all: {
            files: [
                {
                    expand: true,
                    src: 'temp/index.md',
                    dest: '',
                    ext: '.html'
                }
            ],
            options: {
                template: 'src/template.html',
                preCompile: (src, context) => {
                    // checkbox - [ ] || - [x]
                    src = src.replace(/- \[ \]/g, '- <input type="checkbox" disabled>');
                    src = src.replace(/- \[x\]/g, '- <input type="checkbox" checked disabled>');

                    // mark special words ==word==
                    src = src.replace(/==(.+?)==/g, '<mark>$1</mark>');

                    // sup numbers ^2^ to <sup>2</sup>
                    src = src.replace(/\^(\d+)\^/g, '<sup>$1</sup>');

                    return src;
                }
            }
        }
    },
    watch: {
        configs: {
            files: ['docsi.config.json', 'src/template.html'],
            tasks: ['concat', 'markdown']
        },
        md: {
            files: ['src/content/*.md', 'src/content/**/*.md', 'src/content/**/**/*.md'],
            tasks: ['concat', 'markdown']
        },
        css: {
            files: ['src/css/*.css', 'src/css/**/*.css', 'src/css/**/**/*.css'],
            tasks: ['concat']
        },
        js: {
            files: ['src/js/*.js', 'src/js/**/*.js', 'src/js/**/**/*.js'],
            tasks: ['concat']
        },
        assets: {
            files: ['src/assets/*', 'src/assets/**/*', 'src/assets/**/**/*'],
            tasks: ['copy']
        }
    },
    uglify: {
        script: {
            files: {
                [buildDir + '/script.js']: [buildDir + '/script.js']
            }
        }
    },
    cssmin: {
        style: {
            files: {
                [buildDir + '/style.css']: [buildDir + '/style.css']
            }
        }
    },
    prettify: {
        one: {
            src: buildDir + '/index.html',
            dest: buildDir + '/index.html'
        }
    }
});

grunt.registerTask('default', () => {
    grunt.log.writeln('Use "grunt dev" to start the development server.');
    grunt.log.writeln('Use "grunt build" to build the project.');
});

grunt.registerTask('dev', () => {
    grunt.tasks(['clean:temp', 'concat', 'markdown', 'copy:assets', 'watch'], {}, () => {
        grunt.log.writeln('Development server started.');
    });
});

grunt.registerTask('build', () => {
    grunt.tasks(['clean:temp', 'concat', 'markdown', 'clean:dist', 'copy', 'clean:md', 'prettify']);

    if (minifyJs) {
        grunt.task.run('uglify');
    }

    if (minifyCss) {
        grunt.task.run('cssmin');
    }
});