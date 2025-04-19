import { Card, Col, Container, Row } from "react-bootstrap"
import CategoryPageHeader from "../component/CategoryPageHeader"
import React from "react"
import FormModal from "../../../../common/modals/FormModal"
import CreateCategoryForm from "../component/CreateCategoryForm"
import CategoryQueries from "../controllers/CategoryQueries"
import { PuffLoader } from "react-spinners"
import CityImagePlaceholder from "../../../../assets/placeholders/country_image.webp"
import CategoryCardActions from "../component/CategoryCardActions"

const CategoryPage: React.FC = () => {
  const [createFormOpen, setCreateFormOpen] = React.useState(false)

  const { data, isPending, error } = CategoryQueries.useGetCategoriesForAdmin()

  const cardImageStyle: React.CSSProperties = {
    height: "100%", // Fill the height of the container
    width: "100%", // Fill the width of the container
    objectFit: "cover", // Ensure the image fits and maintains aspect ratio
    objectPosition: "center", // Center the image within the container
  }

  return (
    <Container fluid={true}>
      <CategoryPageHeader onAddCategory={() => setCreateFormOpen(true)} />

      {/* Content */}
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        {isPending && (
          <div className="d-flex justify-content-center align-items-center flex-grow-1">
            <PuffLoader color={"#007bff"} loading={isPending} size={70} />
          </div>
        )}
        {error && (
          <div className="d-flex justify-content-center align-items-center flex-grow-1">
            <p>{error.message}</p>
          </div>
        )}
        {data && (
          <Row>
            {data.map(adminCategory => {
              const category = adminCategory.category

              const en = category.translations.find(t => t.lang === 'EN')

              return (
                <Col
                  key={category.id}
                  xs={12} // 1 per row on extra small screens
                  sm={6} // 2 per row on small screens
                  md={4} // 3 per row on medium screens
                  lg={3} // 4 per row on large screens
                  xl={3} // 6 per row on extra large screens
                  className="mb-4 d-flex"
                >
                  <Card className="w-100 d-flex flex-column">
                    <Card.Img
                      style={{ height: '250px', objectFit: 'cover' }}
                      title="City_image"
                      alt="City Image"
                      variant="top"
                      src={
                        category.imageId
                          ? `/api/images/${category.imageId}`
                          : CityImagePlaceholder
                      }
                    />
                    <Card.Body className="flex-grow-1">
                      <Card.Title>
                        {en?.name}
                      </Card.Title>
                      <Card.Text>{en?.description}</Card.Text>
                    </Card.Body >
                    <Card.Footer>
                      <CategoryCardActions
                        category={adminCategory}
                      />
                    </Card.Footer>
                  </Card>
                </Col>
              )
            })}
          </Row>
        )}
      </div>

      <FormModal
        title="Add Category"
        show={createFormOpen}
        onHide={() => setCreateFormOpen(false)}
      >
        <CreateCategoryForm closeDialog={() => setCreateFormOpen(false)} />
      </FormModal>
    </Container>
  )
}

export default CategoryPage
