import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { PlayerData } from 'src/interfaces/player-data';
import {
  Box3,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

@Component({
  selector: 'model-panel',
  templateUrl: './model-panel.component.html',
  styleUrls: ['./model-panel.component.scss'],
})
export class ModelPanelComponent implements AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  @Input() modelUrl!: PlayerData['model'];
  @Input() username!: PlayerData['username'];
  @Input() accountType!: PlayerData['accountType'];

  private renderer!: WebGLRenderer;
  private scene!: Scene;
  private camera!: PerspectiveCamera;

  get shouldShowBadge(): boolean {
    if (this.accountType === null || this.accountType === 'NORMAL') {
      return false;
    } else {
      return true;
    }
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.createRenderer();
    this.createScene();
    this.createCamera();
    this.loadPlyModel();
    this.render();
  }

  private loadPlyModel() {
    new PLYLoader().load(
      this.modelUrl,
      (geometry) => {
        geometry.computeVertexNormals();

        const material = new MeshBasicMaterial({
          vertexColors: true,
        });

        const mesh = new Mesh(geometry, material);
        mesh.rotateX(-1.55);
        mesh.rotateZ(0.1);
        mesh.name = 'player';

        this.scene.add(mesh);

        this.focusCamera(mesh);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private createCamera() {
    this.camera = new PerspectiveCamera(60, 1, 0.1, 1000);
  }

  private createScene() {
    this.scene = new Scene();
    this.scene.background = new Color('#554c41');
  }

  private createRenderer() {
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
  }

  private focusCamera(mesh: Mesh) {
    // Calculate bounding box of the object
    const boundingBox = new Box3().setFromObject(mesh);

    // Calculate center of the bounding box
    const center = boundingBox.getCenter(new Vector3());

    // Calculate the distance from the center of the object to the camera
    const objectSize = boundingBox.getSize(new Vector3());
    const objectDistance =
      Math.max(objectSize.x, objectSize.y, objectSize.z) /
      Math.tan((Math.PI * this.camera.fov) / 360);

    // Set camera position and lookAt to fit the object
    this.camera.position.copy(center);
    this.camera.position.z += (objectDistance + 20) * 0.6;
    this.camera.lookAt(center);
  }

  private render() {
    requestAnimationFrame(this.render.bind(this));
    this.scene.rotation.y = Math.sin(performance.now() * 0.001);

    this.renderer.render(this.scene, this.camera);
  }
}
