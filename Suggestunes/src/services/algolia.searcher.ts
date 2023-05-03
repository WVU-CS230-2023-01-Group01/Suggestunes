import {AngularFireDatabase} from "@angular/fire/compat/database";
import {SongModel} from "../app/playlists/playlist/song/song.model";
import algoliasearch from "algoliasearch";
import {Injectable} from "@angular/core";
@Injectable()
export class AlgoliaSearcher {
  index:any;
  constructor(private db:AngularFireDatabase){
    const algoliasearh = require('algoliasearch')

// Connect and authenticate with your Algolia app
    const client = algoliasearch('F7D70BIWR3', '45fbb323d1a6079c1a72fb60fa49d9bc',{})

// Create a new index and add a record
    this.index = client.initIndex('songs')


    // hello_algolia.js


// Search the index and print the results
    // @ts-ignore


  }
  public search(query:string){
    return this.index.search(query)
  }
  public add(song:SongModel){
    this.index.saveObject({
      objectID : song.uri!,
      song: song
    }).wait()
  }
}
