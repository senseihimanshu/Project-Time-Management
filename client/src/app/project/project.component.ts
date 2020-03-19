import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../services/project.service";
import swal from "sweetalert2";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss", "../main/main.component.scss"]
})
export class ProjectComponent implements OnInit {
  name = "Angular";
  page: number = 1;
  lastPage: number;
  pageSize = 10;
  items = [];

  message: String;
  project: any;
  projectsArray: any;
  membersObj: any = [];
  projManager: any = [];
  limit: number = 5;
  dataSize: number;
  empObjId: string;
  isSortDecreasing: boolean = false;
  sortAccordingTo: any = { startDate: this.isSortDecreasing ? 1 : -1 };

  constructor(
    private projectService: ProjectService
  ) {}

  tabularData(criteria: any = {}) {
    this.projectService.showProjects({
        page: this.page.toString(), 
        limit: this.limit.toString(), 
        criteria: JSON.stringify(criteria),
        columns: JSON.stringify({}),
        sort: JSON.stringify(this.sortAccordingTo)
      })
      .subscribe(res => {
        this.projectsArray = res.payload.data.result.results;
        this.dataSize = res.payload.data.result.dataSize;
      });
  }

  ngOnInit() {
    this.tabularData();
  }

  deleteProject(id: any) {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
          this.projectService.deleteProject(id).subscribe((res: IResponse) => {
            this.message = res.payload.message;
            setTimeout(() => {
              this.message = null;
            }, 5000);
            this.tabularData();
          });
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your project data has been deleted.",
            "success"
          );
        } else if (result.dismiss === swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your projectdata is safe :)",
            "error"
          );
        }
      });
  }

  sortList(sortBy: string) {
    const tempObj = {};
    this.isSortDecreasing = !this.isSortDecreasing;
    tempObj[sortBy] = this.isSortDecreasing ? 1 : -1;

    this.sortAccordingTo = tempObj;

    this.tabularData();
  }

  handlePaginationResult(type: string) {
    if (type === "prev") {
      if (this.page > 1) {
        this.page--;
        this.tabularData();
      }
    }
    if (type === "next") {
      if (this.dataSize > this.page * this.limit) {
        this.page++;
        this.tabularData();
      }
    }
  }
  handleSearch(value: string) {
    var input: string;
    input = value;
    this.tabularData({
      $or: [
        {
          projectName: {
            $regex: `^${input.toLowerCase().trim()}`,
            $options: "i"
          }
        }
      ]
    });
  }
}
