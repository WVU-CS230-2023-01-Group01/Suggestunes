import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs";


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {

  }
}
