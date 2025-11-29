'use strict';

const { ThemesComponentsSass } = require('../sass/themes-components-sass')
const fs = require('node:fs')
const path = require('node:path')

const COMMAND = 'themes_components';

/** @param {import("grunt")} grunt */
module.exports.ThemesComponentsGrunt = function (grunt) {

    grunt.task.registerTask(`${COMMAND}:clean`, `${COMMAND} Development`, function () {
        const builds = path.join(ThemesComponentsSass.basepath, 'builds')
        if (fs.existsSync(builds)) {
            try {
                fs.rmSync(builds, { recursive: true, force: true })
                grunt.log.ok(`Success remove ${builds}`)
            } catch (error) {
                grunt.log.error(`Gagal remove ${builds}`)
                process.exit(1);
            }
        }

        const dist = path.join(ThemesComponentsSass.basepath, 'dist')
        if (fs.existsSync(dist)) {
            try {
                fs.rmSync(dist, { recursive: true, force: true })
                grunt.log.ok(`Success remove ${dist}`)
            } catch (error) {
                grunt.log.error(`Gagal remove ${dist}`)
                process.exit(1);
            }
        }
    });

    grunt.task.registerTask(`${COMMAND}:dist`, 'Development', function () {
        const args = grunt?.task?.current?.args ?? [];
        const initConfig = {
            sass: ThemesComponentsSass.sass,
            concat: ThemesComponentsSass.concat
        }

        grunt.initConfig(initConfig)
        if (args.length > 0) {
            Object.keys(initConfig).forEach(k => {
                if (args.includes(k)) {
                    grunt.task.run([k])
                }
            })
            return;
        }

        grunt.task.run(['sass', 'concat'])
    });

    grunt.task.registerTask(`${COMMAND}:build`, 'Development', function () {
        const build = ThemesComponentsSass.builds;
        const args = grunt?.task?.current?.args ?? [];
        const initConfig = {
            concat: build.concat,
            concat_css: build.concat_css,
        }
        grunt.initConfig(initConfig)
        if (args.length > 0) {
            Object.keys(initConfig).forEach(k => {
                if (args.includes(k)) {
                    grunt.task.run([k])
                }
            })
            return;
        }
        grunt.task.run(['concat', 'concat_css'])
    });

    grunt.task.registerTask(`${COMMAND}:fresh`, 'Clean + Build fresh', [
        `${COMMAND}:clean`,
        `${COMMAND}:dist`,
        `${COMMAND}:build`,
    ]);

    grunt.task.registerTask(`${COMMAND}`, 'Default Bootstrap task', function () {
        grunt.task.run(`${COMMAND}:build`);
    });

};