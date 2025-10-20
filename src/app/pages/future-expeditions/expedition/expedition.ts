import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    OnDestroy,
    QueryList,
    Renderer2,
    signal,
    ViewChild, ViewChildren
} from '@angular/core';
import { ExpeditionPost } from '../../../models/expedition-post.model';
import { ExpeditionsService } from '../../../services/expeditions';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationsService } from '../../../services/animations';
import { SplitHeading } from '../../../directives/split-heading';
import { MoveableImage } from '../../../directives/moveable-image';

@Component({
    selector: 'app-expedition',
    imports: [
        SplitHeading,
        MoveableImage
    ],
    templateUrl: './expedition.html',
    styleUrl: './expedition.css'
})
export class Expedition {}
