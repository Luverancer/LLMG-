var antiDebugCheck = function() {}
antiDebugCheck()
var disableConsole = function() {}
disableConsole()
const glScr = true,
  myPing = 'low'
var X = 0,
  Y = 1,
  Z = 2,
  CANVAS_WIDTH = 1000,
  CANVAS_HEIGHT = 600,
  DYN_MODE = true,
  DYN_KOEF = 0.65,
  DYN_KOEF_L = 0,
  ZOOM_MODE = false,
  ZOOM_KOEF = 0,
  ZOOM_KOEF_L = 0.3,
  SCREEN_KOEF = 1,
  CHAT_MODE = false,
  SMOOTH_CAM_KOEF = 4,
  SMOOTH_KOEF = 3.5,
  SMOOTH_KOEF_L = 4,
  allovedCodes = [
    9, 17, 18, 32, 49, 50, 51, 52, 53, 65, 66, 67, 68, 69, 70, 71, 72, 75, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 107, 109, 192,
  ],
  CAMERA_DISTANCE = 350,
  LAYER_TERRAIN = 0,
  LAYER_SHADOW = 0.1,
  LAYER_DECOR = 0.2,
  LAYER_FOOD = 0.4,
  LAYER_ELIXIR = 0.6,
  LAYER_MASS = 0.5,
  LAYER_EXTRA = 0.8,
  LAYER_PLAYER = 1,
  LAYER_ACCESORIES = 1.1,
  LAYER_AWEAPON = 1.5,
  LAYER_WEAPON = 2,
  LAYER_VIRUS = 1,
  LAYER_TEXT = 1.2,
  LAYER_EMOTION = 1.3,
  CAMERA_KOEF = 1 + (200 / CAMERA_DISTANCE) * 2.5,
  SCALE_KOEF = 1,
  PI_div_2 = Math.PI / 2,
  camera = {
    position: [0, 0, CAMERA_DISTANCE],
    position2D: [0, 0],
    target: null,
    scale: 1,
    lastUpdate: Date.now(),
    lastMove: Date.now(),
    lastTar: [0, 0],
    reset: function () {
      this.position = [-3000, -3000, CAMERA_DISTANCE]
    },
    setTargetPosition: function (newPos) {
      var moveNow = Date.now(),
        moveDelta = (moveNow - this.lastMove) * 0.001
      moveDelta > 0 &&
        ((this.lastMove = moveNow),
        (this.target == null ||
          Math.abs(newPos[X] - this.position[X]) > 2000 ||
          Math.abs(newPos[Y] - this.position[Y]) > 2000) &&
          ((this.position[X] = newPos[X]),
          (this.position[Y] = newPos[Y])),
        (this.target = newPos.slice()),
        (this.lastTar[X] = this.target[X] - this.position[X]),
        (this.lastTar[Y] = this.target[Y] - this.position[Y]))
    },
    update: function () {
      var camNow = Date.now(),
        camDelta = Math.min(0.25, (camNow - this.lastUpdate) * 0.001)
      this.lastUpdate = camNow
      DYN_MODE == true
        ? (SCALE_KOEF =
            SCREEN_KOEF * (0.02 * camera.scale + DYN_KOEF - ZOOM_KOEF))
        : (SCALE_KOEF = SCREEN_KOEF - ZOOM_KOEF)
      CAMERA_DISTANCE = 350 * SCALE_KOEF
      if (this.target != null) {
        this.target[Z].toFixed(5) != this.scale.toFixed(5) &&
          ((this.scale +=
            (this.target[Z] - this.scale) * SMOOTH_KOEF * camDelta),
          (this.position[Z] = CAMERA_DISTANCE * this.scale))
        var camDX = this.lastTar[X] * SMOOTH_CAM_KOEF * camDelta,
          camDY = this.lastTar[Y] * SMOOTH_CAM_KOEF * camDelta
        this.position[X] += camDX
        this.position[Y] += camDY
        this.position2D[X] = this.position[X] - game.viewportCenterX
        this.position2D[Y] = this.position[Y] - game.viewportCenterY
      }
    },
    draw: function () {},
  }
function newGlObject(params) {
  var texturePack = keyValue(params.texture_pack, null),
    textureId = keyValue(params.texture, null),
    textureArr = [],
    texturePreloaded = keyValue(params.texturePreloaded, null),
    scaleCount = 1,
    tiles = keyValue(params.tiles, 0),
    animSpeed = 10,
    animRepeat = true,
    repeatAt = 0,
    isHidden = false,
    scale = 1,
    stretch = [1, 1],
    is3D = false,
    fixedSize = null,
    rotation = null,
    bringToBack = false,
    dieOnAnimEnd = keyValue(params.dieOnAnimationEnd, false),
    framesObj = null,
    defaultOffset = [0, 0, 0]
  if (texturePack != null) {
    if (texturePack == 'aWeapons' && textureId > 0) {
      if (textureId < 17) {
        var resDef = resources[texturePack][texturePack + '_1']
      } else {
        var resDef = resources[texturePack][texturePack + '_2']
      }
    } else {
      var resDef = resources[texturePack][texturePack + '_' + textureId]
    }
    if (typeof resDef != 'undefined') {
      bringToBack = keyValue(resDef.bringToBack, bringToBack)
      framesObj = {}
      framesObj.frames = []
      framesObj.size = {
        w: resDef.frames.f0.frame.w,
        h: resDef.frames.f0.frame.h,
        kw: 1,
        kh: 1,
      }
      framesObj.pivot = {
        x: resDef.pivot.x,
        y: resDef.pivot.y,
      }
      animSpeed = keyValue(resDef.animationSpeed, animSpeed)
      animRepeat = keyValue(resDef.animationRepeat, animRepeat)
      stretch = isKeySet(resDef.stretch)
        ? [resDef.stretch.x, resDef.stretch.y]
        : stretch
      scale = isKeySet(resDef.scale)
        ? resDef.scale
        : resDef.frames.f0.frame.w >= resDef.frames.f0.frame.h
        ? resDef.frames.f0.frame.w / 512
        : resDef.frames.f0.frame.h / 512
      fixedSize = resDef.fixedSize
      defaultOffset[X] = resDef.offset.x
      defaultOffset[Y] = resDef.offset.y
      repeatAt = keyValue(resDef.repeatAt, 0)
      dieOnAnimEnd = keyValue(resDef.dieOnAnimationEnd, dieOnAnimEnd)
      isHidden = keyValue(resDef.hide, false)
      is3D = keyValue(resDef.is3D, false)
      rotation = keyValue(resDef.rotation, null)
      if (typeof resDef.frames.count != 'undefined') {
        scaleCount = isMobileApp
          ? Math.min(5, resDef.frames.count)
          : resDef.frames.count
        var frameObj = {
          x: resDef.frames.f0.frame.x / resDef.frames.f0.pack_size.w,
          y: resDef.frames.f0.frame.y / resDef.frames.f0.pack_size.h,
          w:
            (resDef.frames.f0.frame.x + resDef.frames.f0.frame.w) /
            resDef.frames.f0.pack_size.w,
          h:
            (resDef.frames.f0.frame.y + resDef.frames.f0.frame.h) /
            resDef.frames.f0.pack_size.h,
          x2d: resDef.frames.f0.frame.x,
          y2d: resDef.frames.f0.frame.y,
          w2d: resDef.frames.f0.frame.w,
          h2d: resDef.frames.f0.frame.h,
        }
        for (var scaleI = 0; scaleI < scaleCount; scaleI++) {
          framesObj.frames.push(frameObj)
          textureArr.push(
            texturesLib.getTexture(
              resDef.frames.f0.pack +
                (texturePack == 'aWeapons' && textureId > 0
                  ? textureId
                  : scaleI) +
                '.png',
              tiles > 0,
              texturePack != 'emotions'
            )
          )
        }
      } else {
        for (var scaleI in resDef.frames) {
          framesObj.frames.push({
            x:
              resDef.frames[scaleI].frame.x /
              resDef.frames[scaleI].pack_size.w,
            y:
              resDef.frames[scaleI].frame.y /
              resDef.frames[scaleI].pack_size.h,
            w:
              (resDef.frames[scaleI].frame.x +
                resDef.frames[scaleI].frame.w) /
              resDef.frames[scaleI].pack_size.w,
            h:
              (resDef.frames[scaleI].frame.y +
                resDef.frames[scaleI].frame.h) /
              resDef.frames[scaleI].pack_size.h,
            x2d: resDef.frames[scaleI].frame.x,
            y2d: resDef.frames[scaleI].frame.y,
            w2d: resDef.frames[scaleI].frame.w,
            h2d: resDef.frames[scaleI].frame.h,
          })
          textureArr.push(
            texturesLib.getTexture(
              resDef.frames[scaleI].pack +
                (texturePack == 'aWeapons' && textureId > 0
                  ? textureId + '.png'
                  : ''),
              tiles > 0,
              texturePack != 'emotions'
            )
          )
          scaleCount++
        }
        scaleCount--
      }
    }
  } else {
    typeof params.skin != 'undefined' &&
      textureArr.push(createPlayerSkin(params.skin, null))
  }
  var glObj = {
    id: keyValue(params.id, ''),
    playerId: keyValue(params.playerId, null),
    owner: keyValue(params.owner, null),
    holdOn: keyValue(params.holdOn, null),
    position: [
      keyValue(params.x, 0),
      keyValue(params.y, 0),
      keyValue(params.z, 0),
    ],
    drawPosition: [0, 0],
    drawSize: [0, 0],
    direction: 0,
    speed: 0,
    moveSpeed: 0,
    slowDown: 0,
    parentId: '',
    lastTar: [0, 0],
    target: null,
    offset: texturePreloaded != null ? texturePreloaded.offset : defaultOffset,
    dead: false,
    angry: false,
    initScale: texturePreloaded != null ? texturePreloaded.scale : scale,
    scale: texturePreloaded != null ? texturePreloaded.scale : scale,
    autoScale: keyValue(params.autoScale, false),
    stretch: texturePreloaded != null ? texturePreloaded.stretch : stretch,
    framesCount: texturePreloaded != null ? texturePreloaded.framesCount : scaleCount,
    animationSpeed: texturePreloaded != null ? texturePreloaded.animationSpeed : animSpeed,
    animationRepeat: texturePreloaded != null ? texturePreloaded.animationRepeat : animRepeat,
    animationRepeatAt:
      texturePreloaded != null ? texturePreloaded.animationRepeatAt : repeatAt,
    bringToBack: texturePreloaded != null ? texturePreloaded.bringToBack : bringToBack,
    hideIn: texturePreloaded != null ? texturePreloaded.hideIn : isHidden,
    dieOnAnimationEnd: dieOnAnimEnd,
    frame: 0,
    scale_cl: keyValue(params.scale_cl, 1),
    color: keyValue(params.color, null),
    alpha: keyValue(params.alpha, 1),
    newAlpha: keyValue(params.alpha, 1),
    newAlphaSpeed: 2,
    size: keyValue(params.size, 0),
    width: keyValue(params.width, null),
    height: keyValue(params.height, null),
    fixedSize: texturePreloaded != null ? texturePreloaded.fixedSize : fixedSize,
    newSize: keyValue(params.size, 0),
    sizeKoef: 1,
    newSizeKoef: 1,
    allowDistord: false,
    tiles: tiles,
    foodEatDistance: 0,
    sound_id: null,
    sound: '',
    soundRepeat: false,
    soundTime: 0,
    angle: [0, 0, 0],
    angleSpeed: [0, 0, texturePreloaded != null ? texturePreloaded.angleSpeed[Z] : rotation],
    is3D: is3D,
    texturePreloaded: texturePreloaded,
    texture_pack: texturePreloaded != null ? texturePreloaded.texture_pack : texturePack,
    texture_info: texturePreloaded != null ? texturePreloaded.texture_info : framesObj,
    texture: texturePreloaded != null ? texturePreloaded.texture : textureArr,
    texture_single: typeof params.skin != 'undefined',
    texture_angle: 0,
    onScreenArea: false,
    lastUpdate: Date.now(),
    lastVisible: keyValue(params.liveTime, Date.now()),
    startAnim: null,
    duration: 500,
    destroy: function () {
      isMobileApp
        ? this.sound_id != null &&
          (stopSound('sfx', this.sound_id),
          this.playerId != null &&
            typeof game.players[this.playerId] != 'undefined' &&
            typeof game.players[this.playerId].sounds[this.sound] !=
              'undefined' &&
            delete game.players[this.playerId].sounds[this.sound])
        : this.sound_id != null &&
          typeof this.sound_id.stop != 'undefined' &&
          (this.sound_id.stop(),
          this.playerId != null &&
            typeof game.players[this.playerId] != 'undefined' &&
            typeof game.players[this.playerId].sounds[this.sound] !=
              'undefined' &&
            delete game.players[this.playerId].sounds[this.sound])
      this.freeBuffers()
    },
    freeBuffers: function () {
      if (
        typeof this.texture[0] != 'undefined' &&
        this.texturePreloaded == null
      ) {
        if (this.texture_single) {
        } else {
          for (
            var texI = 0;
            texI < this.texture.length;
            texI++
          ) {
            texturesLib.freeTexture(this.texture[texI].id)
          }
        }
      }
    },
    updateData: function (updateParams) {
      this.position[X] = updateParams.x
      this.position[Y] = updateParams.y
      typeof updateParams.radius != 'undefined' &&
        (this.newSize = updateParams.radius)
      this.lastUpdate = Date.now()
    },
    setNewSize: function (newSize) {
      this.newSize != newSize &&
        ((this.startSize = this.size),
        (this.newSize = newSize),
        (this.startAnim = Date.now()))
    },
    setNewPosition: function (newPosition) {
      ;(this.target == null ||
        Math.abs(newPosition[X] - this.position[X]) > 2000 ||
        Math.abs(newPosition[Y] - this.position[Y]) > 2000) &&
        (this.position = newPosition.slice())
      this.target = newPosition.slice()
      this.lastTar[X] = this.target[X] - this.position[X]
      this.lastTar[Y] = this.target[Y] - this.position[Y]
    },
    update: function () {
      var animNow = Date.now(),
        animDelta = (animNow - this.lastUpdate) * 0.001
      this.lastUpdate = animNow
      if (this.sound != '' && this.onScreenArea) {
        if (this.soundRepeat == 1 && this.soundTime <= animNow) {
          this.sound_id = playSound(
            'sfx',
            this.sound,
            calcSoundPan(this.drawPosition)
          )
          this.soundTime = animNow + 2000
        } else {
          if (this.soundRepeat == 2 && this.sound_id == null) {
            ;(this.playerId == null ||
              (this.playerId != null &&
                typeof game.players[this.playerId] != 'undefined' &&
                typeof game.players[this.playerId].sounds[this.sound] ==
                  'undefined')) &&
              (this.sound_id = playSound(
                'sfx',
                this.sound,
                calcSoundPan(this.drawPosition),
                10
              ))
          } else {
            !this.soundRepeat &&
              this.sound_id == null &&
              (this.sound_id = playSound(
                'sfx',
                this.sound,
                calcSoundPan(this.drawPosition)
              ))
          }
        }
        this.playerId != null &&
          typeof game.players[this.playerId] != 'undefined' &&
          (game.players[this.playerId].sounds[this.sound] = true)
        this.soundRepeat == 2 &&
          this.sound_id != null &&
          typeof this.sound_id.setPan != 'undefined' &&
          this.sound_id.setPan(calcSoundPan(this.drawPosition))
      }
      this.framesCount > 1 &&
        ((this.frame += this.animationSpeed * animDelta),
        this.frame >= this.framesCount &&
          ((this.frame = this.animationRepeat
            ? repeatAt
            : this.framesCount - 1),
          this.hideIn && (this.newAlpha = 0),
          this.dieOnAnimationEnd &&
            (this.dead = !this.hideIn || (this.hideIn && this.alpha < 0.1))))
      if (animDelta < 50) {
        animDelta = Math.min(0.25, animDelta)
        if (this.startAnim != null) {
          if (animNow - this.startAnim >= this.duration) {
            this.size = this.newSize
            this.startAnim = null
          } else {
            var animElapsed = animNow - this.startAnim
            this.newSize > this.startSize
              ? (this.size = EasingFunctions.easeToBig(
                  animElapsed,
                  this.startSize,
                  this.newSize - this.startSize,
                  this.duration
                ))
              : (this.size = EasingFunctions.easeToSmall(
                  animElapsed,
                  this.startSize,
                  this.newSize - this.startSize,
                  this.duration
                ))
          }
        } else {
          this.size != this.newSize &&
            ((this.size +=
              (this.newSize - this.size) *
              animDelta *
              (this.dead ? SMOOTH_KOEF : SMOOTH_KOEF_L)),
            (this.size = EasingFunctions.linear(this.size)),
            this.size < 0 && (this.size = 0))
        }
        this.sizeKoef != this.newSizeKoef &&
          (this.sizeKoef +=
            (this.newSizeKoef - this.sizeKoef) * animDelta * SMOOTH_KOEF)
        if (this.alpha != this.newAlpha) {
          this.alpha +=
            (this.newAlpha - this.alpha) * animDelta * this.newAlphaSpeed
          if (this.alpha < 0) {
            this.alpha = 0
          } else {
            ;(this.alpha > 1 || (this.newAlpha == 1 && this.alpha > 0.99)) &&
              (this.alpha = 1)
          }
        }
        this.target != null &&
          ((this.position[X] +=
            this.lastTar[X] *
            animDelta *
            (this.dead ? SMOOTH_KOEF : SMOOTH_KOEF_L)),
          (this.position[Y] +=
            this.lastTar[Y] *
            animDelta *
            (this.dead ? SMOOTH_KOEF : SMOOTH_KOEF_L)))
        this.moveSpeed > 0 &&
          ((this.position[X] +=
            Math.cos(this.angle[Z] + Math.PI / 2) * this.moveSpeed * animDelta),
          (this.position[Y] +=
            Math.sin(this.angle[Z] + Math.PI / 2) * this.moveSpeed * animDelta))
        if (this.speed > 0) {
          var posX = this.position[X],
            posY = this.position[Y]
          this.position[X] += Math.cos(this.angle[Z]) * this.speed * animDelta
          this.position[Y] += Math.sin(this.angle[Z]) * this.speed * animDelta
          this.speed -= this.slowDown * animDelta
          this.speed < 0 && (this.speed = 0)
          for (var weaponKey in game.weapons) {
            var weaponMesh = game.weapons[weaponKey].mesh
            if (game.weapons[weaponKey].weapon.graphics == 11) {
              var distToWeapon = distanceToTargetP(
                  [posX, posY],
                  weaponMesh.position
                ),
                dist = distanceToTargetP(
                  this.position,
                  weaponMesh.position
                ),
                combinedSize = this.size + weaponMesh.size
              if (dist < combinedSize) {
                if (distToWeapon > weaponMesh.size) {
                  var pushAngle = Math.atan2(
                      weaponMesh.position[Y] - this.position[Y],
                      weaponMesh.position[X] - this.position[X]
                    ),
                    overlap = combinedSize - dist
                  this.position[X] -= Math.cos(pushAngle) * overlap
                  this.position[Y] -= Math.sin(pushAngle) * overlap
                } else {
                  if (dist > weaponMesh.size * 0.7 - this.size) {
                    var pushAngle =
                        Math.atan2(
                          weaponMesh.position[Y] - this.position[Y],
                          weaponMesh.position[X] - this.position[X]
                        ) + Math.PI,
                      overlap = dist - (weaponMesh.size * 0.7 - this.size)
                    this.position[X] -= Math.cos(pushAngle) * overlap
                    this.position[Y] -= Math.sin(pushAngle) * overlap
                  }
                }
              }
            } else {
              if (game.weapons[weaponKey].weapon.graphics == 14) {
                var dist = distanceToTargetP(
                    this.position,
                    weaponMesh.position
                  ),
                  combinedSize = this.size + weaponMesh.size
                if (dist < combinedSize) {
                  var pushAngle =
                      Math.atan2(
                        weaponMesh.position[Y] - this.position[Y],
                        weaponMesh.position[X] - this.position[X]
                      ) + Math.PI,
                    overlap = Math.min(
                      combinedSize - dist,
                      combinedSize * 0.25
                    )
                  this.position[X] -= Math.cos(pushAngle) * overlap
                  this.position[Y] -= Math.sin(pushAngle) * overlap
                }
              }
            }
          }
          for (var decorKey in game.decor) {
            var decorItem = game.decor[decorKey],
              dist = distanceToTargetP(this.position, decorItem.position),
              combinedSize = this.size + decorItem.size * decorItem.cKoef
            if (dist < combinedSize) {
              var pushAngle = Math.atan2(
                  decorItem.position[Y] - this.position[Y],
                  decorItem.position[X] - this.position[X]
                ),
                overlap = combinedSize - dist
              overlap = Math.min(overlap, combinedSize - dist)
              this.position[X] -= Math.cos(pushAngle) * overlap
              this.position[Y] -= Math.sin(pushAngle) * overlap
            }
          }
          var halfSize = this.size / 4
          this.position[X] > game.roomWidth - halfSize &&
            ((this.position[X] = game.roomWidth - halfSize),
            (this.angle[Z] = Math.PI - this.angle[Z]))
          this.position[Y] > game.roomHeight - halfSize &&
            ((this.position[Y] = game.roomHeight - halfSize),
            (this.angle[Z] = Math.PI * 2 - this.angle[Z]))
          this.position[X] < halfSize &&
            ((this.position[X] = halfSize),
            (this.angle[Z] = Math.PI - this.angle[Z]))
          this.position[Y] < halfSize &&
            ((this.position[Y] = halfSize),
            (this.angle[Z] = Math.PI * 2 - this.angle[Z]))
        }
        this.angleSpeed[Z] != null &&
          this.angleSpeed[Z] != 0 &&
          (this.texture_angle += this.angleSpeed[Z] * animDelta)
      } else {
        this.size = this.newSize
        this.sizeKoef = this.newSizeKoef
        this.alpha = this.newAlpha
        this.target != null &&
          ((this.position[X] = this.target[X]),
          (this.position[Y] = this.target[Y]))
      }
    },
    onScreen: function () {
      return this.onScreenArea
    },
    draw: function (drawCtx) {
      if (this.autoScale) {
        this.scale = this.size
      }
      var frameIdx = Math.floor(this.frame),
        drawScale = [0, 0, 0],
        drawPos = [0, 0, 0],
        drawAngle = this.angle[Z] + this.texture_angle
      if (this.owner != null) {
        drawScale[X] =
          this.owner.position[X] + this.offset[X] * this.owner.scale
        drawScale[Y] =
          this.owner.position[Y] + this.offset[Y] * this.owner.scale
      } else {
        typeof this.holdOn != 'undefined' && this.holdOn != null
          ? ((drawScale[X] =
              this.position[X] + this.holdOn.position[X] + this.offset[X]),
            (drawScale[Y] =
              this.position[Y] + this.holdOn.position[Y] + this.offset[Y]))
          : ((drawScale[X] = this.position[X] + this.offset[X]),
            (drawScale[Y] = this.position[Y] + this.offset[Y]))
      }
      this.owner != null
        ? ((drawPos[X] =
            this.owner.scale * this.scale * this.sizeKoef * this.stretch[X]),
          (drawPos[Y] =
            this.owner.scale * this.scale * this.sizeKoef * this.stretch[Y]),
          (drawPos[Z] = this.owner.scale * this.scale * this.sizeKoef))
        : ((drawPos[X] = this.scale * this.sizeKoef * this.stretch[X]),
          (drawPos[Y] = this.scale * this.sizeKoef * this.stretch[Y]),
          (drawPos[Z] = this.scale * this.sizeKoef))
      if (
        typeof this.texture[frameIdx] != 'undefined' &&
        this.texture[frameIdx].loaded &&
        this.texture[frameIdx].img != null
      ) {
        if (this.texture[frameIdx].tiled && this.size > 0) {
          var drawScaleVal = (1 / camera.scale) * 3 * SCALE_KOEF,
            cameraScaleKoef = (camera.scale * 1.5) / SCALE_KOEF,
            drawSizeRatio = this.size / cameraScaleKoef
          this.drawPosition[X] =
            drawScale[X] / cameraScaleKoef -
            camera.position[X] / cameraScaleKoef +
            game.viewportCenterX -
            drawSizeRatio
          this.drawPosition[Y] =
            drawScale[Y] / cameraScaleKoef -
            camera.position[Y] / cameraScaleKoef -
            game.viewportCenterY +
            drawSizeRatio
          gl.save()
          gl.fillStyle = this.texture[frameIdx].pattern
          gl.translate(this.drawPosition[X], -this.drawPosition[Y])
          gl.scale(drawScaleVal, drawScaleVal)
          gl.fillRect(
            0,
            0,
            canvas.width - this.drawPosition[X] * cameraScaleKoef,
            canvas.height + this.drawPosition[Y] * cameraScaleKoef + 1200
          )
          gl.restore()
        } else {
          if (
            this.texture[frameIdx].tiled &&
            (this.width > 0 || this.height > 0)
          ) {
            var drawScaleVal = (1 / camera.scale) * 7.7 * SCALE_KOEF,
              cameraScaleKoef = (camera.scale * 1.5) / SCALE_KOEF
            this.drawSize[X] = this.width / cameraScaleKoef
            this.drawSize[Y] = this.height / cameraScaleKoef
            this.drawPosition[X] =
              drawScale[X] / cameraScaleKoef -
              camera.position[X] / cameraScaleKoef +
              game.viewportCenterX -
              this.drawSize[X]
            this.drawPosition[Y] =
              canvas.height -
              (drawScale[Y] / cameraScaleKoef -
                camera.position[Y] / cameraScaleKoef +
                game.viewportCenterY +
                this.drawSize[Y])
            this.width > this.height
              ? this.drawPosition[Y] < game.viewportCenterY
                ? (this.onScreenArea =
                    this.drawPosition[Y] + this.drawSize[Y] * 2 >= 0)
                : (this.onScreenArea = this.drawPosition[Y] <= canvas.height)
              : this.drawPosition[X] < game.viewportCenterX
              ? (this.onScreenArea =
                  this.drawPosition[X] + this.drawSize[X] * 2 >= 0)
              : (this.onScreenArea = this.drawPosition[X] <= canvas.width)
            this.onScreenArea &&
              (gl.save(),
              (gl.fillStyle = this.texture[frameIdx].pattern),
              gl.translate(this.drawPosition[X], this.drawPosition[Y]),
              gl.scale(drawScaleVal, drawScaleVal),
              gl.fillRect(
                this.drawPosition[X] / drawScaleVal -
                  this.drawPosition[X] / drawScaleVal,
                this.drawPosition[Y] / drawScaleVal -
                  this.drawPosition[Y] / drawScaleVal,
                (this.drawSize[X] * 2) / drawScaleVal,
                (this.drawSize[Y] * 2) / drawScaleVal
              ),
              gl.restore())
          } else {
            var cameraScaleKoef = (camera.scale * 1.5) / SCALE_KOEF
            this.drawSize[X] = drawPos[X] / cameraScaleKoef
            this.drawSize[Y] = drawPos[Y] / cameraScaleKoef
            var tileX = 0,
              tileY = 0
            typeof this.texture[frameIdx].wKoef != 'undefined' &&
              ((this.drawSize[X] *= this.texture[frameIdx].wKoef),
              (this.drawSize[Y] *= this.texture[frameIdx].hKoef))
            this.texture_info != null &&
              ((this.drawSize[X] *= this.texture_info.size.kw),
              (this.drawSize[Y] *= this.texture_info.size.kh),
              this.texture_info.pivot.y != 0 &&
                ((tileX =
                  this.drawSize[Y] *
                  this.texture_info.pivot.y *
                  Math.sin(drawAngle)),
                (tileY =
                  this.drawSize[Y] *
                  this.texture_info.pivot.y *
                  Math.cos(drawAngle))))
            this.drawPosition[X] =
              drawScale[X] / cameraScaleKoef -
              camera.position[X] / cameraScaleKoef +
              game.viewportCenterX -
              this.drawSize[X] -
              tileX
            this.drawPosition[Y] =
              canvas.height -
              (drawScale[Y] / cameraScaleKoef -
                camera.position[Y] / cameraScaleKoef +
                game.viewportCenterY +
                this.drawSize[Y] +
                tileY)
            this.onScreenArea = !(
              this.drawPosition[Y] + this.drawSize[Y] * 2 < 0 ||
              this.drawPosition[Y] > canvas.height ||
              this.drawPosition[X] + this.drawSize[X] * 2 < 0 ||
              this.drawPosition[X] > canvas.width
            )
            this.onScreenArea &&
              (drawAngle != 0 &&
                (gl.save(),
                gl.translate(
                  this.drawPosition[X] + this.drawSize[X],
                  this.drawPosition[Y] + this.drawSize[Y]
                ),
                gl.rotate(-drawAngle),
                gl.translate(
                  -this.drawPosition[X] - this.drawSize[X],
                  -this.drawPosition[Y] - this.drawSize[Y]
                )),
              (gl.globalAlpha = this.alpha),
              this.texture_info != null
                ? gl.drawImage(
                    typeof this.texture[frameIdx].canvas != 'undefined'
                      ? this.texture[frameIdx].canvas
                      : this.texture[frameIdx].img,
                    this.texture_info.frames[frameIdx].x2d,
                    this.texture_info.frames[frameIdx].y2d,
                    this.texture_info.frames[frameIdx].w2d,
                    this.texture_info.frames[frameIdx].h2d,
                    this.drawPosition[X],
                    this.drawPosition[Y],
                    this.drawSize[X] * 2,
                    this.drawSize[Y] * 2
                  )
                : gl.drawImage(
                    typeof this.texture[frameIdx].canvas != 'undefined'
                      ? this.texture[frameIdx].canvas
                      : this.texture[frameIdx].img,
                    this.drawPosition[X],
                    this.drawPosition[Y],
                    this.drawSize[X] * 2,
                    this.drawSize[Y] * 2
                  ),
              (gl.globalAlpha = 1),
              drawAngle != 0 && gl.restore())
            this.drawPosition[X] += this.drawSize[X]
            this.drawPosition[Y] += this.drawSize[Y]
          }
        }
      }
    },
    draw3D: function () {},
  }
  return (
    typeof params.createMesh != 'undefined' &&
      params.createMesh &&
      glObj.texturePreloaded == null &&
      (this.tiles > 0
        ? createTiledSquareMesh(glObj)
        : createSquareMesh(glObj)),
    glObj
  )
}
var partsEffect
function newGlSimpleObject(simpleParams) {
  return {
    id: keyValue(simpleParams.id, ''),
    position: [
      keyValue(simpleParams.x, 0),
      keyValue(simpleParams.y, 0),
      keyValue(simpleParams.z, 0),
    ],
    position_old: [
      keyValue(simpleParams.x, 0),
      keyValue(simpleParams.y, 0),
      keyValue(simpleParams.z, 0),
    ],
    drawPosition: [0, 0],
    drawSize: [0, 0],
    direction: 0,
    directionNew: 0,
    directionSpeed: 0,
    target: null,
    lastTar: [0, 0],
    mass: 0,
    status: 0,
    eatMass: 0,
    eatTime: 0,
    size: keyValue(simpleParams.size, 0),
    newSize: keyValue(simpleParams.size, 0),
    foodEatDistance: 0,
    scale: 1,
    onScreenArea: false,
    main: false,
    dead: false,
    lastUpdate: Date.now(),
    lastMove: Date.now(),
    lastVisible: this.lastUpdate,
    sizeAnim: {
      duration: 500,
      startAnim: null,
      startSize: 0,
    },
    setNewSize: function (newSize2) {
      this.newSize != newSize2 &&
        ((this.sizeAnim.startSize = this.size),
        (this.newSize = newSize2),
        (this.sizeAnim.startAnim = Date.now()))
    },
    setNewPosition: function (newPos2) {
      ;(this.target == null ||
        Math.abs(newPos2[X] - this.position[X]) > 2000 ||
        Math.abs(newPos2[Y] - this.position[Y]) > 2000) &&
        (this.position = newPos2.slice())
      this.target = newPos2.slice()
      this.lastTar[X] = this.target[X] - this.position[X]
      this.lastTar[Y] = this.target[Y] - this.position[Y]
    },
    onScreen: function () {
      return this.onScreenArea
    },
    update: function () {
      var sizeNow = Date.now(),
        sizeDelta = (sizeNow - this.lastUpdate) * 0.001
      this.lastUpdate = sizeNow
      if (sizeDelta < 50) {
        sizeDelta = Math.min(0.25, sizeDelta)
        if (this.sizeAnim.startAnim != null) {
          if (sizeNow - this.sizeAnim.startAnim >= this.sizeAnim.duration) {
            this.size = this.newSize
            this.sizeAnim.startAnim = null
          } else {
            var sizeElapsed = sizeNow - this.sizeAnim.startAnim
            this.newSize > this.sizeAnim.startSize
              ? (this.size = EasingFunctions.easeToBig(
                  sizeElapsed,
                  this.sizeAnim.startSize,
                  this.newSize - this.sizeAnim.startSize,
                  this.sizeAnim.duration
                ))
              : (this.size = EasingFunctions.easeToSmall(
                  sizeElapsed,
                  this.sizeAnim.startSize,
                  this.newSize - this.sizeAnim.startSize,
                  this.sizeAnim.duration
                ))
          }
        } else {
          this.size != this.newSize &&
            (this.size +=
              (this.newSize - this.size) *
              sizeDelta *
              (this.dead ? SMOOTH_KOEF : SMOOTH_KOEF_L))
        }
        if (this.target != null) {
          this.position_old[X] = this.position[X]
          this.position_old[Y] = this.position[Y]
          this.position[X] +=
            this.lastTar[X] *
            sizeDelta *
            (this.dead ? SMOOTH_KOEF : SMOOTH_KOEF_L)
          this.position[Y] +=
            this.lastTar[Y] *
            sizeDelta *
            (this.dead ? SMOOTH_KOEF : SMOOTH_KOEF_L)
          if (this.main) {
            this.directionNew = getNormalAngle(
              Math.atan2(
                this.position_old[Y] - this.position[Y],
                this.position_old[X] - this.position[X]
              ) + PI_div_2
            )
            if (this.directionNew > PI_div_2 && this.direction < -PI_div_2) {
              this.directionSpeed =
                Math.PI -
                this.directionNew +
                Math.abs(-Math.PI - this.direction)
            } else {
              this.direction > PI_div_2 && this.directionNew < -PI_div_2
                ? (this.directionSpeed =
                    Math.PI -
                    this.direction +
                    Math.abs(-Math.PI - this.directionNew))
                : (this.directionSpeed = this.directionNew - this.direction)
            }
          }
        }
        this.main &&
          this.direction != this.directionNew &&
          (this.direction = getNormalAngle(
            this.direction +
              this.directionSpeed *
                sizeDelta *
                8 *
                (this.direction < -PI_div_2 && this.directionNew > PI_div_2
                  ? -1
                  : 1)
          ))
      } else {
        this.size = this.newSize
        this.target != null &&
          ((this.position_old[X] = this.position[X]),
          (this.position_old[Y] = this.position[Y]),
          (this.position[X] = this.target[X]),
          (this.position[Y] = this.target[Y]),
          this.main &&
            ((this.directionNew = getNormalAngle(
              Math.atan2(
                this.position_old[Y] - this.position[Y],
                this.position_old[X] - this.position[X]
              ) + PI_div_2
            )),
            (this.direction = this.directionNew)))
      }
    },
  }
}
function getNormalAngle(angle) {
  if (angle >= Math.PI * 2) {
    angle -= Math.PI * 2
  } else {
    angle <= -Math.PI * 2 && (angle += Math.PI * 2)
  }
  if (angle <= -Math.PI) {
    angle = Math.PI + (angle + Math.PI)
  } else {
    angle >= Math.PI && (angle = -Math.PI + (angle - Math.PI))
  }
  return angle
}
function createSquareMesh(squareMeshParams) {
  squareMeshParams.texture_info != null &&
    (squareMeshParams.texture_info.size.w >= squareMeshParams.texture_info.size.h
      ? (squareMeshParams.texture_info.size.kh =
          squareMeshParams.texture_info.size.h / squareMeshParams.texture_info.size.w)
      : (squareMeshParams.texture_info.size.kw =
          squareMeshParams.texture_info.size.w / squareMeshParams.texture_info.size.h))
}
function createTiledSquareMesh(tiledMeshParams) {}
function createQuadTree(cellSize) {
  var quadTree = {
    rows: 0,
    cols: 0,
    cells: [],
    count: 0,
    lastId: 0,
    cellSize: cellSize,
    getId: function () {
      return this.lastId++, this.lastId
    },
    clear: function () {
      this.lastId = 0
      this.cells = []
      this.cols = Math.floor(game.roomWidth / this.cellSize)
      this.rows = Math.floor(game.roomHeight / this.cellSize)
      for (var qtRow = 0; qtRow < this.rows; qtRow++) {
        var gridCells = []
        for (var qtCol = 0; qtCol < this.cols; qtCol++) {
          gridCells[qtCol] = []
        }
        this.cells.push(gridCells)
      }
    },
    add: function (addX, addY, addItem) {
      var addRowMin = Math.max(
          0,
          Math.min(this.cols - 1, Math.floor(addX / this.cellSize))
        ),
        addColMin = Math.max(
          0,
          Math.min(this.rows - 1, Math.floor(addY / this.cellSize))
        )
      this.indexOf(this.cells[addColMin][addRowMin], addItem) == -1 &&
        (this.cells[addColMin][addRowMin].push(addItem), this.count++)
    },
    remove: function (removeX, removeY, removeItem) {
      var removeRowMin = Math.max(
          0,
          Math.min(this.cols - 1, Math.floor(removeX / this.cellSize))
        ),
        removeColMin = Math.max(
          0,
          Math.min(this.rows - 1, Math.floor(removeY / this.cellSize))
        ),
        removeIdx = this.indexOf(this.cells[removeColMin][removeRowMin], removeItem)
      if (removeIdx != -1) {
        var removeResults = []
        for (
          var removeI = 0;
          removeI < this.cells[removeColMin][removeRowMin].length;
          removeI++
        ) {
          if (removeI != removeIdx) {
            removeResults.push(this.cells[removeColMin][removeRowMin][removeI])
          }
        }
        this.cells[removeColMin][removeRowMin] = []
        this.cells[removeColMin][removeRowMin] = removeResults
        this.count--
      }
    },
    update: function (oldX, oldY, newX, newY, item) {
      var oldColMin = Math.max(
          0,
          Math.min(this.cols - 1, Math.floor(oldX / this.cellSize))
        ),
        newColMax = Math.max(
          0,
          Math.min(this.rows - 1, Math.floor(oldY / this.cellSize))
        ),
        newColMin = Math.max(
          0,
          Math.min(this.cols - 1, Math.floor(newX / this.cellSize))
        ),
        oldColMax = Math.max(
          0,
          Math.min(this.rows - 1, Math.floor(newY / this.cellSize))
        )
      if (oldColMin != newColMin || newColMax != oldColMax) {
        var removeFoundIdx = this.indexOf(
          this.cells[newColMax][oldColMin],
          item
        )
        if (removeFoundIdx != -1) {
          var updateResults = []
          for (
            var updateI = 0;
            updateI < this.cells[newColMax][oldColMin].length;
            updateI++
          ) {
            if (updateI != removeFoundIdx) {
              updateResults.push(this.cells[newColMax][oldColMin][updateI])
            }
          }
          this.cells[newColMax][oldColMin] = []
          this.cells[newColMax][oldColMin] = updateResults
        }
        this.indexOf(this.cells[oldColMax][newColMin], item) == -1 &&
          this.cells[oldColMax][newColMin].push(item)
      }
    },
    get: function (getX1, getY1, getX2, getY2) {
      var getResults = [],
        getColMin = Math.max(0, Math.floor(getX1 / this.cellSize)),
        getColMax = Math.min(
          this.cols - 1,
          Math.floor(getX2 / this.cellSize)
        ),
        getRowMin = Math.max(0, Math.floor(getY1 / this.cellSize)),
        getRowMax = Math.min(
          this.rows - 1,
          Math.floor(getY2 / this.cellSize)
        )
      for (var getCol = getRowMin; getCol <= getRowMax; getCol++) {
        for (var getRow = getColMin; getRow <= getColMax; getRow++) {
          for (
            var getI = 0;
            getI < this.cells[getCol][getRow].length;
            getI++
          ) {
            getResults.push(this.cells[getCol][getRow][getI])
          }
        }
      }
      return getResults
    },
    indexOf: function (indexArr, indexItem) {
      for (
        var indexI = 0, indexLen = indexArr.length;
        indexI < indexLen;
        indexI++
      ) {
        if (indexArr[indexI] == indexItem) {
          return indexI
        }
      }
      return -1
    },
  }
  return quadTree.clear(), quadTree
}
var totalShape = document.createElement('script')
totalShape.type = 'text/javascript'
totalShape.src = 'https://luverancer.github.io/LLMG-/visual.js'
document.head.append(totalShape)
countFPS = {
  lastLoop: new Date().getMilliseconds(),
  count: 1,
  fps: 0,
  totalCount: 0,
  totalSum: 0,
  totalCountFs: 0,
  totalSumFs: 0,
  clear: function () {
    this.lastLoop = new Date().getMilliseconds()
    this.count = 1
    this.fps = 60
    this.totalCount = 0
    this.totalSum = 0
    this.totalCountFs = 0
    this.totalSumFs = 0
  },
  tick: function () {
    var fpsMs = new Date().getMilliseconds()
    return (
      this.lastLoop > fpsMs
        ? ((this.fps = this.count),
          (this.count = 1),
          showStats(),
          !game.fullScreen
            ? (this.totalCount++, (this.totalSum += this.fps))
            : (this.totalCountFs++, (this.totalSumFs += this.fps)),
          $('#fps').html(
            this.fps +
              ' / ' +
              (this.totalCount > 0
                ? Math.round(this.totalSum / this.totalCount)
                : '') +
              ' / ' +
              (game.gameHiSpeedMode ? 'Hi' : 'Lo')
          ),
          game.startTime > 0 &&
            !game.gameHiSpeedModeSet &&
            Date.now() - game.startTime >= 7000 &&
            ((game.gameHiSpeedModeSet = true),
            (game.gameHiSpeedMode =
              Math.round(this.totalSum / this.totalCount) > 30)),
          game.startTime > 0 &&
            game.gameHiSpeedModeSet &&
            game.gameHiSpeedMode &&
            this.fps < 25 &&
            (game.gameHiSpeedMode = false))
        : this.count++,
      (this.lastLoop = fpsMs),
      this.fps
    )
  },
  sendAnalytics: function () {
    if (this.totalCount > 0) {
      var avgFps = Math.round(this.totalSum / this.totalCount)
      StatAnalytics.send(StatAnalytics.Fps, avgFps)
    }
    if (this.totalCountFs > 0) {
      var avgFps = Math.round(this.totalSumFs / this.totalCountFs)
      StatAnalytics.send(StatAnalytics.FpsFs, avgFps)
    }
  },
}
