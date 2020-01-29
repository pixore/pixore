# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0](https://github.com/pixore/pixore/compare/v0.4.0...v0.5.0) (2020-01-29)


### Features

* **artboards:** use xstate to manage artboards ([f520ae9](https://github.com/pixore/pixore/commit/f520ae9dbca8cfd44fc9788bade6f68fcafac7c2))
* **history:** add undo and redu for frames and layers ([860f7cb](https://github.com/pixore/pixore/commit/860f7cb84e0c8525fe64e3cb96abb540f070e96e))
* **history:** improve undo for deleting frames and layers ([f302d5c](https://github.com/pixore/pixore/commit/f302d5cf33dfb6d178085d71fcece29c4e1e48f9))
* **history:** improve undo for deleting layers ([1d9c028](https://github.com/pixore/pixore/commit/1d9c028acc34cf288168654bc1ac7e903f137e5c))
* **history:** support undo and redu for painting ([9830548](https://github.com/pixore/pixore/commit/98305481ede37d92daed6a91a44a4315ad64696a))
* **modifiers:** implement modifiers state using xstate ([b3c08cc](https://github.com/pixore/pixore/commit/b3c08ccaf820c883389ed286373ee940aa8fd7d8))
* **palettes:** implement palettes states using xstate ([bc5753a](https://github.com/pixore/pixore/commit/bc5753a10afd3343942631d781a787b83dd3a389))
* **portal:** create custom portal ([ee09b40](https://github.com/pixore/pixore/commit/ee09b40e36ee51ae15954e2135fa32f4bc83649f))
* **sprite:** remove layers and frames ([51df184](https://github.com/pixore/pixore/commit/51df1843a786b8c426b7ea306cea912b33bc2af0))
* **state:** create app machine ([24fd73b](https://github.com/pixore/pixore/commit/24fd73b97a5f3a48c92fce1820b8c316a4cfb6ef))
* **state:** remove frame and layer machine ([4fde9bc](https://github.com/pixore/pixore/commit/4fde9bcb19cfe6834ef067aab7c40da1de00228d))
* **state:** use app machine to control the state ([bf8894c](https://github.com/pixore/pixore/commit/bf8894c39e2c58944afcac83cfb8d9864ee9e988))
* **state:** use xstate ([2d6776c](https://github.com/pixore/pixore/commit/2d6776c67397631be706a52fc467652f97944ed3))
* **welcome:** improve size and position of the welcome window ([2d347a5](https://github.com/pixore/pixore/commit/2d347a53b591fbd8b51a560120745c4de52a8654))
* **windows:** implement windows state with xstate ([d0f3de3](https://github.com/pixore/pixore/commit/d0f3de3d9ccf570ad269d72e2af641cc8a18447d))


### Bug Fixes

* **menus:** stop use Reach.MenuItem as separator ([2e3f761](https://github.com/pixore/pixore/commit/2e3f7614da32b2d564f4488d4c1bd92fdf2dd56d))
* **paint:** use the latest version of the artboard ([54bfc06](https://github.com/pixore/pixore/commit/54bfc066e08285e9ec6eee4eb748d78d4b6ede95))
* **ssr:** fix usage of components using useLayoutEffect ([2f1a1fe](https://github.com/pixore/pixore/commit/2f1a1fedebf168c9d787a564a73a45a0b633c126))
* **welcome:** fix welcome window behavior ([52b9f84](https://github.com/pixore/pixore/commit/52b9f8441a739c9836e524dac523d21af707c080))
* **welcome:** fix welcome window behavior ([42c1f88](https://github.com/pixore/pixore/commit/42c1f883d91337197855d8876ea33efed8d952dd))

## [0.4.0](https://github.com/pixore/pixore/compare/v0.3.0...v0.4.0) (2020-01-12)


### Features

* **color:** add missing functionality in the color picker ([0af38ae](https://github.com/pixore/pixore/commit/0af38ae11c6ba6b8bfd9b53eea5cfdad90927d95))
* **color:** add support for hsv ([3b79443](https://github.com/pixore/pixore/commit/3b79443ed190222da0f5392925f24e9ffea5cda8))
* **color:** changes selected color using the color picker ([4430d93](https://github.com/pixore/pixore/commit/4430d9398ad4461c03a0d1070c312e647100c101))
* **color:** create basic color picker structure ([e31cae5](https://github.com/pixore/pixore/commit/e31cae5ff0f83684e202bf0e4defdff01297615c))
* **color:** create Color type ([988b612](https://github.com/pixore/pixore/commit/988b6120deb865d3a86a3859bc43ece287ffce2a))
* **color:** create fullAlpha and pureHue functions ([a3c8e3c](https://github.com/pixore/pixore/commit/a3c8e3cf65891c7bf6de8ec660728463e30fc196))
* **color:** create isEqual function to compare colors ([8614ed9](https://github.com/pixore/pixore/commit/8614ed91c24730de3ef052f16bf11b0095648060))
* **colors:** use new color type ([ce0c522](https://github.com/pixore/pixore/commit/ce0c522e87ec06d428a3254d065244659b7fa529))
* **components:** create CenterButton component ([6b9f7d9](https://github.com/pixore/pixore/commit/6b9f7d97ff0a366e698bb4ea9a7a071363d08cf6))
* **context:** create windows context ([1169f99](https://github.com/pixore/pixore/commit/1169f99b79e5383f5fc3d65dd8d2008338f601a1))
* **editor:** add a global event emitter ([4e81d94](https://github.com/pixore/pixore/commit/4e81d94b06b2279f54b5ce20df88883cae7d9bc6))
* **hooks:** create useMouseEvent hooks ([5007718](https://github.com/pixore/pixore/commit/5007718cc778c04bac5770adddfd608da71fa0fd))
* **palette:** create ColorPicker component placeholder ([f7918de](https://github.com/pixore/pixore/commit/f7918de28f6d295c46041c73cc2c5d7a3fbe0d2d))
* **palette:** implement palette context ([f0b5000](https://github.com/pixore/pixore/commit/f0b500038b8a227623e720c8f03673ffcc6ca7d7))
* **palette:** import styles ([397c04c](https://github.com/pixore/pixore/commit/397c04c369e1f6203057e4556c11d76db0e18bb4))
* **palette:** improve way of showing which colors are selected ([1ee0d5b](https://github.com/pixore/pixore/commit/1ee0d5b042b57f15b9cd81d410f9cd43dead5c44))
* **palettes:** create Palettes and Palette contexts ([85126b8](https://github.com/pixore/pixore/commit/85126b8f3a4ce7413040d269fa986f67ad3c9387))
* **tools:** create tools component ([35c50d6](https://github.com/pixore/pixore/commit/35c50d6fda9fe5113875c40aad10ac0a9d8ce7b4))
* **utils:** create numberIsBetween function ([a89e9cb](https://github.com/pixore/pixore/commit/a89e9cbd192a997fdf9c10c59b8325f52afe4f0d))
* **welcome:** implement welcome window using the context windows ([19c95cc](https://github.com/pixore/pixore/commit/19c95ccc7aec3a6aacc3c044e82778a9d5834fc7))
* **windows:** make the windows dragable ([cf27a37](https://github.com/pixore/pixore/commit/cf27a37eaa67e6d202f87fa3b5013ab9f3eadae8))
* **windows:** make the windows more configurable ([5a913fe](https://github.com/pixore/pixore/commit/5a913fed6277b2b32ee5a13d1e0f8c774ecd9791))


### Bug Fixes

* **a11y:** use the correct id in labels ([0b26501](https://github.com/pixore/pixore/commit/0b26501bb3bd806fbb4b587cf77a445984746e9c))

## [0.3.0](https://github.com/pixore/pixore/compare/v0.2.0...v0.3.0) (2019-12-17)


### Features

* **analytics:** add analytics for production ([02e1d25](https://github.com/pixore/pixore/commit/02e1d255d1bb707a40bffac161e80b17850757e0))
* **layout:** improve layout size ([02f3067](https://github.com/pixore/pixore/commit/02f3067f262fb8dc17d217783d709c69bd7b4405))
* **play:** add disable state for the play button ([4692421](https://github.com/pixore/pixore/commit/46924213c8233db985783d5b7c6694212dd2cfaf))
* **preview:** create hook to share play and pause logic ([c3e7740](https://github.com/pixore/pixore/commit/c3e774080d4cf5668f57ce4e9fbe4e59e2e3f977))
* **preview:** create preview panel ([094d48a](https://github.com/pixore/pixore/commit/094d48ad638941022c5649badbd81df9ca144826))
* **sequencer:** improve sequencer styles ([6720a36](https://github.com/pixore/pixore/commit/6720a3619fc32577e08268517106a490d2acb203))
* **welcome:** show only once the welcome window by version ([b185c4f](https://github.com/pixore/pixore/commit/b185c4fc92c9b1ff4954cdaa40bd21f3fb3c33b6))
* **welcome:** update changelog ([9e8364c](https://github.com/pixore/pixore/commit/9e8364c69983fc48a223d46a250a8157e59b113b))


### Bug Fixes

* **a11y:** fix a11y problems ([366bab2](https://github.com/pixore/pixore/commit/366bab29d380896b009cfc8c8cea6f8afe0ed365))
* **canvas:** fix preview when the color is transparent ([2e32ea6](https://github.com/pixore/pixore/commit/2e32ea6a949df617b66ab7cb3dd71f93586fa33f))

## [0.2.0](https://github.com/pixore/pixore/compare/v0.1.0...v0.2.0) (2019-12-07)


### Features

* **canvas:** add a margin to the default scale ([8682a29](https://github.com/pixore/pixore/commit/8682a2938c30b6d93ef9b239cf3ffc91c508e58e))
* **canvas:** create useTool ([34e8418](https://github.com/pixore/pixore/commit/34e84182968535676c5e6bcceaa542b2f1d851cb))
* **welcome:** use @pixore/window to create the welcome window ([e097fad](https://github.com/pixore/pixore/commit/e097fadd773646e3cdd2a77d8f86360779ab1ff1))


### Bug Fixes

* **canvas:** make painting pixel perfect base on the layout ([e9f7cc5](https://github.com/pixore/pixore/commit/e9f7cc50afcbc3109a52baa648f604227e4976f8))
* **types:** fix imported type ([a5073d7](https://github.com/pixore/pixore/commit/a5073d777d885781d8bd8397f630c3e7ce6e3450))
* **types:** fix imported types ([2d4bc09](https://github.com/pixore/pixore/commit/2d4bc091eb7524c13951a1b79358e5d6c6ea44f0))

## [0.1.0](https://github.com/pixore/pixore/compare/v0.0.6...v0.1.0) (2019-11-30)


### Bug Fixes

* **changelog:** fix release date ([56535c6](https://github.com/pixore/pixore/commit/56535c6f8e09bb3d68e1902dc84c5cbc44c38c0f))

### [0.0.6](https://github.com/pixore/pixore/compare/v0.0.5...v0.0.6) (2019-11-30)


### Features

* **canvas:** make the position independent of the artboard ([660f5a9](https://github.com/pixore/pixore/commit/660f5a9af018bacebc2905cba6ad84f3e2e03862))
* **header:** create project name component ([6734bea](https://github.com/pixore/pixore/commit/6734bea652f60c88338977ebf391471b368ce052))
* **header:** improve header and create separator ([2f14418](https://github.com/pixore/pixore/commit/2f14418f6b9b887e5e70654a2e361f64be2db365))
* **layout:** add default layout ([2c11195](https://github.com/pixore/pixore/commit/2c11195c6ec386099c3273a9e46ed0d3eb744444))
* **layout:** use subdivide component ([f8ff92c](https://github.com/pixore/pixore/commit/f8ff92c34edf3e74294ffcb6af5fa50f57eb7808))
* **panel:** create panel component ([7fbb24f](https://github.com/pixore/pixore/commit/7fbb24fb4c1a4124055d7c4f391bacd9f213e906))
* **panel:** create panel select component ([624759b](https://github.com/pixore/pixore/commit/624759bbe02d4981d42c759632788d1134ef42bb))
* **panel:** create simplest preview panel ([c589be2](https://github.com/pixore/pixore/commit/c589be2d0b5dc6a46dea27f81dac1656433997db))
* **panel:** improve panel styles ([e79a197](https://github.com/pixore/pixore/commit/e79a19765f6114681760e7fa7debfc61d7155600))
* **panels:** make palette and frames-and-layers panels ([4f93955](https://github.com/pixore/pixore/commit/4f939556f45cb378b82e4a40558885726aa2d23d))
* **styles:** improve styles ([6ead73d](https://github.com/pixore/pixore/commit/6ead73db259c3711ed0686a0206e195d71ba7bf1))


### Bug Fixes

* **buttons:** fix button colors ([6743d57](https://github.com/pixore/pixore/commit/6743d57d7da02576422eb9240a5573def0018a98))
* **canvas:** fix problems with the canvas and the new layout ([b03e783](https://github.com/pixore/pixore/commit/b03e783cff0e0ea4b9b8fb80af0f14171927dd1a))
* **panel:** use correct value for the radius ([52f7c9d](https://github.com/pixore/pixore/commit/52f7c9d77d6886d9b6497fb542e0e5552f2b440a))

### [0.0.5](https://github.com/pixore/pixore/compare/v0.0.4...v0.0.5) (2019-11-24)


### Bug Fixes

* **welcome:** add scroll to the welcome window ([382f60a](https://github.com/pixore/pixore/commit/382f60aa1038344a1b4000a92f7ab3b349dc54d9))

### [0.0.4](https://github.com/pixore/pixore/compare/v0.0.3...v0.0.4) (2019-11-23)

### [0.0.3](https://github.com/pixore/pixore/compare/v0.0.2...v0.0.3) (2019-11-23)


### Features

* **components:** create About component ([63ffa00](https://github.com/pixore/pixore/commit/63ffa00f9eddda8ffb2eed2da4169564f583c872))
* **components:** create Changelog component ([9398562](https://github.com/pixore/pixore/commit/93985626eb503cfa3b516bf20ab064c6e721b916))
* **index:** use About and Changelog components ([953c302](https://github.com/pixore/pixore/commit/953c302eda0cec30c952f90b83cd52b5140e5244))
* **introduction :** create introduction modal ([c19d75c](https://github.com/pixore/pixore/commit/c19d75c4587dcef6cf6fd3bd39c353ee09a21674))

### 0.0.2 (2019-08-28)


### Bug Fixes

* **next:** revert next version ([6436755](https://github.com/pixore/pixore/commit/6436755))


### Features

* **actions:** improve how layers and frames are added ([d29b5ac](https://github.com/pixore/pixore/commit/d29b5ac))
* **artboard:** create ArtboardsContext ([b70363c](https://github.com/pixore/pixore/commit/b70363c))
* **artboard:** create layer and frame change actions ([538b630](https://github.com/pixore/pixore/commit/538b630))
* **artboards:** create Artboards and Artboard context ([7e0bf6d](https://github.com/pixore/pixore/commit/7e0bf6d))
* **bootstrap:** create bootstrap component ([0b98064](https://github.com/pixore/pixore/commit/0b98064))
* **canvas:** create Canvas component ([6b8ce0a](https://github.com/pixore/pixore/commit/6b8ce0a))
* **canvas:** create FrameLayers ([7fd1d78](https://github.com/pixore/pixore/commit/7fd1d78))
* **canvas:** create useCanvas2DContext ([9a6fafd](https://github.com/pixore/pixore/commit/9a6fafd))
* **canvas:** implement Canvas component ([aa1ed28](https://github.com/pixore/pixore/commit/aa1ed28))
* **canvas:** improve center algorithm ([e0e3070](https://github.com/pixore/pixore/commit/e0e3070))
* **canvas:** paint all layers for the current frame ([d1b03de](https://github.com/pixore/pixore/commit/d1b03de))
* **colors:** implement primary and secondary colors ([5a3f183](https://github.com/pixore/pixore/commit/5a3f183))
* **context-menu:** stop showing context menu for right click ([0a192ed](https://github.com/pixore/pixore/commit/0a192ed))
* **contexts:** implemement artboards and sprites contexts ([49983e7](https://github.com/pixore/pixore/commit/49983e7))
* **dom:** create utils to manage events using jquery style ([9e7ec5b](https://github.com/pixore/pixore/commit/9e7ec5b))
* **editor:** create Editor component ([f566ec2](https://github.com/pixore/pixore/commit/f566ec2))
* **editor:** create EditorContext and its reducer ([45b547d](https://github.com/pixore/pixore/commit/45b547d))
* **events:** support window as element to handler its handlers ([75d29e7](https://github.com/pixore/pixore/commit/75d29e7))
* **frames:** create and implement frames context ([e5808a5](https://github.com/pixore/pixore/commit/e5808a5))
* **frames-and-layers:** add frame number ([10735cf](https://github.com/pixore/pixore/commit/10735cf))
* **frames-and-layers:** create basic functionality ([e6e6861](https://github.com/pixore/pixore/commit/e6e6861))
* **keyboard:** create getModifierState utility ([f978b60](https://github.com/pixore/pixore/commit/f978b60))
* **layers:** create layers context ([bcc0675](https://github.com/pixore/pixore/commit/bcc0675))
* **layers:** fix the order of the layers being rendered ([dae2250](https://github.com/pixore/pixore/commit/dae2250))
* **layers:** select layer when it's just created ([10e9683](https://github.com/pixore/pixore/commit/10e9683))
* **layout:** add more layout structure ([162b98d](https://github.com/pixore/pixore/commit/162b98d))
* **layout:** create basic structure ([f78fd67](https://github.com/pixore/pixore/commit/f78fd67))
* **menu:** create Menu component ([1f408aa](https://github.com/pixore/pixore/commit/1f408aa))
* **modifiers:** create Modifiers context ([4563456](https://github.com/pixore/pixore/commit/4563456))
* **paint:** implement paint mask and main functions ([fd423d0](https://github.com/pixore/pixore/commit/fd423d0))
* **paint:** improve how render and paint ([3938be4](https://github.com/pixore/pixore/commit/3938be4))
* **palette:** create a basic palette ([0914751](https://github.com/pixore/pixore/commit/0914751))
* **palette:** create basic color component ([062a025](https://github.com/pixore/pixore/commit/062a025))
* **panning:** implement panning using spacebar and mouse ([c6644aa](https://github.com/pixore/pixore/commit/c6644aa))
* **pen:** implement liner interpolation for pen tool ([df0ebfe](https://github.com/pixore/pixore/commit/df0ebfe))
* **pen:** implement right click painting ([f854bfb](https://github.com/pixore/pixore/commit/f854bfb))
* **preview:** create Preview component ([102e04a](https://github.com/pixore/pixore/commit/102e04a))
* **preview:** implement pen tool ([52c342e](https://github.com/pixore/pixore/commit/52c342e))
* **preview:** show a pixel as a preview of the cursor ([38d798f](https://github.com/pixore/pixore/commit/38d798f))
* **preview:** support panning over all the window ([d57850f](https://github.com/pixore/pixore/commit/d57850f))
* **preview:** use primary color in preview ([095933d](https://github.com/pixore/pixore/commit/095933d))
* **review:** check for spacebar being down and mouse being down ([1df82fa](https://github.com/pixore/pixore/commit/1df82fa))
* **sprite:** add createNewVersion action to force new renders ([0ff1e4e](https://github.com/pixore/pixore/commit/0ff1e4e))
* **sprites:** create Sprite and Sprites contexts ([3743eb5](https://github.com/pixore/pixore/commit/3743eb5))
* **sprites:** create sprites context reducer ([8ecf707](https://github.com/pixore/pixore/commit/8ecf707))
* **sprites:** create SpritesContext ([6fe959c](https://github.com/pixore/pixore/commit/6fe959c))
* **tool:** create basic pen tool ([f077751](https://github.com/pixore/pixore/commit/f077751))
* **tool:** improve pen tool ([69a0dca](https://github.com/pixore/pixore/commit/69a0dca))
* **tool:** make paint and getColor utils functions ([25d1254](https://github.com/pixore/pixore/commit/25d1254))
* **tool:** remove panning and preview logic from pen tool ([e86e53c](https://github.com/pixore/pixore/commit/e86e53c))
* **tool:** support tool in the artboard ([97c10b0](https://github.com/pixore/pixore/commit/97c10b0))
* **tools:** change artboard tool from tool buttons ([68144d2](https://github.com/pixore/pixore/commit/68144d2))
* **tools:** create Tool component ([3112e10](https://github.com/pixore/pixore/commit/3112e10))
* **tools:** create tool utils ([b997358](https://github.com/pixore/pixore/commit/b997358))
* **tools:** create tools folder ([fcdf465](https://github.com/pixore/pixore/commit/fcdf465))
* **tools:** improve how tool listeners are added and removed ([82072c3](https://github.com/pixore/pixore/commit/82072c3))
* **utils:** add several util funtions ([1806c9f](https://github.com/pixore/pixore/commit/1806c9f))
* **utils:** create round2 ([f68b7ba](https://github.com/pixore/pixore/commit/f68b7ba))
* **vector:** create Vector utils ([8151772](https://github.com/pixore/pixore/commit/8151772))
* **zoom:** improve zoom behavior ([f1b9211](https://github.com/pixore/pixore/commit/f1b9211))
